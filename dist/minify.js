let pokemonRepository = (function() {
  let t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    "object" == typeof e ? t.push(e) : console.log("pokemon is not correct");
  }
  function o(t) {
    i(t).then(function() {
      !(function(t) {
        let e = $(".modal-title"),
          n = $(".modal-body");
        e.empty(), n.empty();
        let o = $(
            "<h1>" + t.name.charAt(0).toUpperCase() + t.name.slice(1) + "</h1>"
          ),
          i = $("<p>Height: " + t.height + " cm</p>"),
          s = $("<p>Weight: " + t.weight + " pounds</p>"),
          l = $("<p>Types: " + t.types + "</p>"),
          a = $('<img class="modal-img" style="width:50%">');
        a.attr("src", t.imgUrl),
          e.append(o),
          n.append(a),
          n.append(i),
          n.append(s),
          n.append(l);
      })(t);
    });
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imgUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (let n = 0; n < e.types.length; n++) {
          let o = e.types[n].type.name;
          t.types.push(o[0].toUpperCase() + o.substring(1));
        }
        t.abilities = [];
        for (let n = 0; n < e.abilities.length; n++) {
          let o = e.abilities[n].ability.name;
          t.abilities.push(o[0].toUpperCase() + o.substring(1));
        }
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = document.querySelector(".pokemon-list"),
        n = document.createElement("li");
      n.classList.add("listItem-style");
      let i = document.createElement("button");
      (i.innerText = t.name.charAt(0).toUpperCase() + t.name.slice(1)),
        i.classList.add("button-class", "btn", "btn-primary", "btn-sm"),
        i.setAttribute("data-toggle", "modal"),
        i.setAttribute("data-target", "#pokemonModal"),
        n.appendChild(i),
        e.appendChild(n),
        i.addEventListener("click", function() {
          o(t);
        });
    },
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: i,
    showDetails: o
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
