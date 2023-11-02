import { useState } from 'react';
import { Formik, Form, Field } from "formik";

import './header.css'
import './content.css'
import './article.css'

const App = () =>{

  const [photos, setPhotos] = useState([]);

  const open = url => window.open(url);

  const handleSubmit = async (values) =>{
    // llamar a la API
    const response = await fetch(
      `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
      {
        headers: {
          'Authorization': 'Client-ID UHNgoCTzZlUnzW2awPKFb50bKrNSRvUyDYCnNwCwyfc'
        }
      }
    )
    
    // Convertir a json la respuesta
    const data = await response.json()
    
    // Guardar en el estado
    setPhotos(data.results)
}
    return (
        <div>
            <header>
              <Formik
                initialValues={{ search: '' }}
                onSubmit={handleSubmit}
              >
                <Form>
                    <Field name="search" placeholder="Buscar ej: Perro"/>
                </Form>
              </Formik>
          </header>
          <div className='container'>
            <div className='center'>
              {photos.length === 0 ? 
                (<p>No hay nada para mostrar...</p>)
              :
                (photos.map(photo => 
                  <article key={photo.id} onClick={() => open(photo.links.html)} title='Click para visualizar en unsplash.com'>
                    <img src={photo.urls.regular} />
                    <p>{[photo.description, photo.alt_description].join(' - ')}</p>
                  </article>
                ))
              }
              
            </div>
          </div>
        </div>
    )
}

export default App;