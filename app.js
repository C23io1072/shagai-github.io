//Тоглогчийн ээлж, нийт оноо, ээлжийн оноонуудыг хадгалах хувьсагчууд
var activePlayer, scores, roundScore;

//Шинээр төглоом эхэлж байгааг хадгалах төлөвийн хувьсагч
var isNewGame;

//Вэб хуудас гарч ирэхэд автоматаар Тоглоомыг шинээр эхлүүлэх функц
initGame();

function initGame() {
  //Тоглоом эхэллээ гэдэг төлөвт оруулна
  isNewGame = true;
  document.getElementById("btn-start").disabled = true;
  document.getElementById("btn-horse-move").disabled = true;

  //Тоглогчийн ээлжийг хадгалах хувьсагч: 1-р тоглогч=0, 2-р тоглогч=1
  activePlayer = 0;
  //Тоглогчдын цуглуулсан нийт оноог хадгалах хувьсагч
  scores = [0, 0];
  //Тоглогчдын ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;
  //Программ эхлэхэд бэлтгэе!
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;

  //Яллаа гэдэг мэдээллийг алга болгож тоглогчдын нэрийг анхны хэлбэрт нь авчрах
  document.getElementById("player-0").textContent = "1-Р ТОГЛОГЧ";
  document.getElementById("player-1").textContent = "2-Р ТОГЛОГЧ";

  //Тоглоом 1-р тоглогчоос эхлэх тул нэр болон оноог УЛААН болгож харин 2-р тоглогчийнхийг анхны хэлбэрээр байлгах
  document.getElementById("player-0-name-score").classList.add("active");
  document.getElementById("player-1-name-score").classList.remove("active");

  //Дөрвөн шагайны зургаа Display None болгох
  for (var x = 1; x < 5; x++) {
    document.getElementById(`bone-${x}`).style.display = "none";
  }

  //ШАГАЙ ХАЯХ ТОВЧ идэвхитэй байх ёстой
  document.getElementById("btn-shagai-hayah").disabled = false;

  //Уралдах 2 морь байраа эзлэх
  document.getElementById("0-0").src = `/img/HORSE-0.png`;
  document.getElementById("1-0").src = `/img/HORSE-1.png`;

  //Уралдааны замыг хоослох
  // document.querySelector(".horse-img").src = " ";
  for (var x = 0; x < 2; x++) {
    for (var y = 1; y < 9; y++) {
      document.getElementById(`${x}-${y}`).src = "";
    }
  }
}

// ************* ШАГАЙ ОРХИХ EventListener **************

document
  .getElementById("btn-shagai-hayah")
  .addEventListener("click", function () {
    var bone1 = Math.floor(Math.random() * 4) + 1;
    var bone2 = Math.floor(Math.random() * 4) + 1;
    var bone3 = Math.floor(Math.random() * 4) + 1;
    var bone4 = Math.floor(Math.random() * 4) + 1;
    console.log(bone1, bone2, bone3, bone4);

    //Дөрвөн шагайны зургаа Display Block болгох
    for (var x = 1; x < 5; x++) {
      document.getElementById(`bone-${x}`).style.display = "block";
    }

    //Санамсаргүй тоонд харгалзуулан шагайны зургийг оруулах
    document.getElementById("bone-1").src = `/img/` + bone1 + `_shagai.jpg`;
    document.getElementById("bone-2").src = `/img/` + bone2 + `_shagai.jpg`;
    document.getElementById("bone-3").src = `/img/` + bone3 + `_shagai.jpg`;
    document.getElementById("bone-4").src = `/img/` + bone4 + `_shagai.jpg`;

    //Нийт хэдэн морь буусан тоог гаргах
    if (bone1 !== 1) bone1 = 0;
    if (bone2 !== 1) bone2 = 0;
    if (bone3 !== 1) bone3 = 0;
    if (bone4 !== 1) bone4 = 0;
    roundScore = bone1 + bone2 + bone3 + bone4;
    console.log(roundScore);

    //Хэрэв морь буувал МОРИО УРАГШЛУУЛАХ ТОВЧ идэвхитэй болно.
    //ШАГАЙГАА ОРХИХ ТОВЧ идэвхигүй болно.
    if (roundScore > 0) {
      document.getElementById("btn-horse-move").disabled = false;
      document.getElementById("btn-shagai-hayah").disabled = true;
    }
  });

// ************* МОРЬ УРАГШЛУУЛАХ **************
document
  .getElementById("btn-horse-move")
  .addEventListener("click", function () {
    //Өмнөх ОНООНЫ морьны зургийг устгах функц
    function removeHorseImg(scores1, activePlayer1) {
      document.getElementById(`${activePlayer1}-${scores1}`).src = "";
    }

    //Аль нэг тоглогчийн оноо 8-аас их болсон эсэхийг шалгах: 6 дээр байснаа 4 буух, 6+4
    if (scores[activePlayer] + roundScore >= 8) {
      //Өмнөх байрлалын морины зургаа арилгах
      setTimeout(removeHorseImg(scores[activePlayer], activePlayer), 3000);

      //7+4=11 болбол НИЙТ ОНОО-г 11 гэж аваад харин Морио 8-дээр байрлуулна
      document.getElementById(
        `${activePlayer}-8`
      ).src = `/img/HORSE-${activePlayer}.png`;

      //Тоглогч яллаа гэсэн бичиг гаргах
      document.getElementById(`player-${activePlayer}`).textContent = `${
        activePlayer + 1
      }-Р ТОГЛОГЧ ЯЛЛАА!!`;

      //НИЙТ ОНООГ харуулах
      scores[activePlayer] = scores[activePlayer] + roundScore;
      console.log(
        `${activePlayer}-тоглогчийн НИЙТ ОНОО+${scores[activePlayer]}`
      );
      document.getElementById(`score-${activePlayer}`).textContent =
        scores[activePlayer];

      document.getElementById("btn-shagai-hayah").disabled = true;
      document.getElementById("btn-horse-move").disabled = true;
      document.getElementById("btn-start").disabled = false;
    } else {
      //Өмнөх байрлалын морины зургаа арилгах /Нийт оноо өмнөхөөр бгаа!!!/
      setTimeout(removeHorseImg(scores[activePlayer], activePlayer), 3000);

      //НИЙТ ОНООГ харуулах
      scores[activePlayer] = scores[activePlayer] + roundScore;
      console.log(
        `${activePlayer}-тоглогчийн НИЙТ ОНОО+${scores[activePlayer]}`
      );
      document.getElementById(`score-${activePlayer}`).textContent =
        scores[activePlayer];

      //Морио байрлуулах
      document.getElementById(
        `${activePlayer}-${scores[activePlayer]}`
      ).src = `/img/HORSE-${activePlayer}.png`;

      //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлэх
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

      //Ээлж шилжсэн тоглогчийн мэдээллийг /нэр, оноо/ улаан өнгөтэй болгох
      document.getElementById("player-0-name-score").classList.toggle("active");
      document.getElementById("player-1-name-score").classList.toggle("active");
      document.getElementById("btn-shagai-hayah").disabled = false;
      document.getElementById("btn-horse-move").disabled = true;
      //Дөрвөн шагайны зургаа Display None болгох
      for (var x = 1; x < 5; x++) {
        document.getElementById(`bone-${x}`).style.display = "none";
      }
    }
  });

// ************* ТОГЛООМ ШИНЭЭР ЭХЛҮҮЛЭХ ТОВЧ ДАРАХАД**************

document.getElementById("btn-start").addEventListener("click", initGame);
