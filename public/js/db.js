const db = firebase.firestore();

// enable offline data
db.enablePersistence().catch(err => {
  switch (err.code) {
    case "failed-precondition":
      // probably multible tabs open at once
      console.log("persistance failed");
      break;
    case "unimplemented":
      // lack of browser support for the feature
      console.log("persistance not available");
  }
});

// real-time listener
db.collection("user").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") renderRecipe(change.doc.data(), change.doc.id) ;
    else if (change.type === "removed") removeRecipe(change.doc.id);
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", evt => {
  evt.preventDefault();

  const user = {
    username: form.title.value,
    password: form.ingredients.value
  };

  db.collection("user")
    .add(user)
    .catch(err => console.log(err));

  form.title.value = "";
  form.ingredients.value = "";
});

// remove a recipe
document.querySelector(".recipes").onclick = evt => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    //console.log(id);
    db.collection("user")
      .doc(id)
      .delete();
  }
};
