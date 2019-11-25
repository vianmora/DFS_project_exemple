//module.exports est un objet rendu par require.
// on lui donne donc comme attribut, les méthodes et constante que l'on veut voir transmise.

module.exports = {
    klaxon : () => {
        console.log("tuuuut !");
    },

    reponse: 42,
}