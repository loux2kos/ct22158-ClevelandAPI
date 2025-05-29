$(document).ready(function () {
  //Φόρτωση Καλλιτεχνών
  $.getJSON("https://openaccess-api.clevelandart.org/api/creators/", function (response) {
    const creators = response.data;

    if (creators && creators.length > 0) {
      $.each(creators, function (index, creator) {
        $("#creators tbody").append("<tr><td>" + creator.description + "</td></tr>");
      });
    } else {
      $("#creators tbody").append("<tr><td>Δεν βρέθηκαν καλλιτέχνες.</td></tr>");
    }
  });

  //Φόρτωση 10 Έργων Τέχνης
  $.getJSON("https://openaccess-api.clevelandart.org/api/artworks?limit=10&has_image=1", function (response) {
    const artworks = response.data;

    $.each(artworks, function (index, art) {
      const title = art.title || "Χωρίς τίτλο";
      let creator = "Άγνωστος";

      if (art.creators && art.creators.length > 0) {
        creator = art.creators[0].description;
      }

      const imageURL = art.images?.web?.url || "";

      const li = $("<li></li>");
      li.append("<strong>" + title + "</strong><br>");
      li.append("Δημιουργός: " + creator + "<br>");

      const button = $("<button>Προβολή Εικόνας</button>");
      const img = $("<img>").attr("src", imageURL);

      button.on("click", function () {
        img.toggle();
      });

      li.append(button);
      li.append(img);
      $("#artworks").append(li);
    });
  });
});
