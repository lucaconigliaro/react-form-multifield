import { useEffect, useState } from "react";

// Struttura base per un nuovo articolo
const initialFormData = {
  id: "",
  title: "",
  author: "",
  image: "",
  content: "",
  category: "",
  tags: [],
  published: false
}

const availableTags = ["HTML", "CSS", "Express.Js", "React"]; // Lista dei tags

function App() {

  const [article, setArticle] = useState([]);

  const [formData, setFormData] = useState(initialFormData);

  const [availableMessage, setAvailableMessage] = useState("");

  // Viene eseguito ogni volta che cambia lo stato "published" del form
  useEffect(() => {
    if (formData.published) {
      setAvailableMessage("Stai pubblicando il post, controlla se tutti i dati inseriti sono corretti");
    } else {
      setAvailableMessage("Nessun post ancora pubblicato");
    }
  }, [formData.published]);

  // Gestione del modulo quando viene inviato
  const handleArticleForm = (event) => {
    event.preventDefault();
    if (formData.title !== "" && formData.author !== "") {

      const newArticle = {
        ...formData, // Copia tutti i dati attualmente nel modulo.
        id: Date.now() // Aggiunge un ID unico basato sull'ora attuale.
      };

      const newArray = [...article, newArticle]; // Crea un nuovo array con l'articolo aggiunto.
      setArticle(newArray);

      setFormData(initialFormData);
    };
  };

  const cancel = (idToDelete) => {
    const newArray = article.filter(curArticle => curArticle.id !== idToDelete);
    setArticle(newArray);
  }

  const handleInputChange = (event) => {
    const keyToChange = event.target.name; // Nome del campo modificato.
    const newValue = event.target.value; // Nuovo valore inserito.

    const newData = {
      ...formData,
      [keyToChange]: newValue
    };

    setFormData(newData);
  };

  // Gestione del cambiamento per la checkbox.
  const handlePublishedChange = () => {
    setFormData({
      ...formData,
      published: !formData.published // Inverte lo stato della checkbox.
    });
  };

  // Gestione della sezione dei tag
  const handleTagChange = (event) => {
    const newValue = event.target.value;
    const checked = event.target.checked;
    let updatedTags;

    if (checked) {
      // Aggiunge il tag se è selezionato
      updatedTags = [...formData.tags, newValue];
    } else {
      // Rimuove il tag se non è selezionato
      updatedTags = formData.tags.filter((tag) => tag !== newValue);
    }
  
    setFormData({
      ...formData,
      tags: updatedTags
    });
  }

  return (
    <>
      <div className="container">
        <section>
          <h2>Nuovi Articoli</h2>
          {article.length > 0 ? (
            <div className="row row-cols-2">
              {article.map((curArticle) => (
                <div className="col" key={curArticle.id}>
                  <div className="card">
                    <img src={curArticle.image} alt={curArticle.title} className="card-img-top" />
                    <div className="card-body">
                      <h4>{curArticle.title}</h4>
                      <p>Autore: {curArticle.author}</p>
                      <p>Categoria: {curArticle.category}</p>
                      <p>Tags: {curArticle.tags.join(", ")}</p>
                      <p>{curArticle.content}</p>
                      <button onClick={() => cancel(curArticle.id)} className="btn btn-danger">🗑️ Elimina</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nessun articolo</p>
          )}
        </section>

        <section>
          <h3>Aggiungi un nuovo articolo</h3>
          <form onSubmit={handleArticleForm}>
            <div>
              <label htmlFor="articleTitle">Nome dell'articolo</label>
              <input
                id="articleTitle"
                type="text"
                className="form-control mb-2"
                placeholder="Inserisci il titolo dell'articolo"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="articleAuthor">Autore</label>
              <input
                id="articleAuthor"
                type="text"
                className="form-control mb-2"
                placeholder="Inserisci l'Autore"
                name="author"
                value={formData.author}
                onChange={handleInputChange} />
            </div>

            <div>
              <label htmlFor="articleImage">Immagine dell'articolo</label>
              <input
                id="articleImage"
                type="text"
                className="form-control mb-2"
                placeholder="Inserisci l'immagine dell'articolo"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="articleContent">Contenuto dell'articolo</label>
              <textarea
                id="articleContent"
                className="form-control mb-2"
                placeholder="Inserisci il contenuto dell'articolo"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div>
              <label htmlFor="articleCategory">Categoria dell'articolo</label>
              <select
                id="articleCategory"
                className="form-control mb-2"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>Seleziona una categoria</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Express.JS">Express.JS</option>
                <option value="React">React</option>
              </select>
            </div>

            <div>
              <p className="mt-3">Seleziona i tag:</p>
              {availableTags.map((tag) => (
                <div key={tag} className="form-check" style={{ display: "inline-block", marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`tag-${tag}`}
                    value={tag}
                    checked={formData.tags.includes(tag)}
                    onChange={handleTagChange}
                  />
                  <label htmlFor={`tag-${tag}`} className="form-check-label">
                    {tag}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label htmlFor="articlePublished">Pubblicato</label>
              <input
                id="articlePublished"
                type="checkbox"
                className="form-check-input"
                name="published"
                checked={formData.published}
                onChange={handlePublishedChange}
              />
              <div>{availableMessage}</div>
            </div>

            <button
              type="submit"
              className="btn btn-success mt-2"
              disabled={!formData.title || !formData.author || !formData.content || !formData.category}
            >
              Invia
            </button>

          </form>
        </section>
      </div>
    </>
  );
};

export default App