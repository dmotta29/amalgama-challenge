// Se podria mejorar:

// La constante "contactsToDisplay" se podria pasar para otro componente ya que si bien se usa en este componente,
// no es necesario mostrarla aca de esta manera. Tampoco tiene sentido mapearla de como se hace fuera del render
// FindById y truncate no son funciones de JS
// Se podria guardar los valores de href en unas variables y pasarselas de manera dinamica
//Los parametros cities y states no se estan usando en este caso
// No se si cuenta como error pero tuve que modificar llaves y parentesis para hacer que el jsx funcionara
// De no ser necesario por cuestion de estilos el primer div y el div despues de mapear contactsToDisplay, se podrian reemplazar por un fragmento
//Al tag de img le hacen falta atributos (height, width, alt, loading)
//En los .map del render, no se les esta asignando ninguna key al contenedor de todo lo mapeado
//Para las direcciones, es necesario colocar un condicional por si el contacto tiene solo 1 direccion

//Justificacion:
// Pasar nuestra data mockeada a otro componente nos da mas limpieza a la hora de trabajar. Mapear alli donde se estaba mapeando no nos sirve de nada
// Para buscar por index podemos usar indexOf o findIndex. El metodo trunc en JS es para trabajar con numeros, no srings
//Guardar los href en variables nos sirve por si tenemos que compartir esta data con otros componentes. simplemente pasamos esos valores que siempre seran los mismos
//Agregando estos attributos al img nos aseguramos que las imagenes no se veran mas grandes rompiendo nuestra UI, mostrara algo si la imagen no carga y con el lazy,
// solo se cargara la imagen cuando sea necesario. Esto nos ayudara con nuestra performance
// El key es necesario para que React sepa que elementos fueron cambiados agreados o eliminados. No es recomendable ussar el index para el key pero lo uso en este momento por practicidad
//El condicional es necesario ya que de lo contrario, se mostrara ese tag vacio (en este caso un Li)

import { contacts } from "./contacs-screen-mock-data";
import { useLocalStore } from "../../store/store";
export const ContactsScreen = () => {
  const books = useLocalStore((state) =>  state.books)
  const users = useLocalStore((state) =>  state.users)
  //En este console log se ve como quedaria el estado en formato JSON
  console.log(books, users)
  

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/contacts">My Contacts</a>
          </li>
        </ul>
      </nav>
      <h1>Contacts 👥</h1>
      {contacts.map((contact, index) => (
        <div key={index}>
          <div>
            <img
              src={contact.avatar_url}
              alt="avatar"
              width={100}
              height={100}
              loading="lazy"
            />
            <h3>{contact.full_name}</h3>
          </div>
          <p>{contact.details}</p>
          <ul>
            <li>email: {contact.email}</li>
            <li>phone: {contact.phone_number}</li>
            <li>
              {contact.addresses.length > 1 ? (
                <h4>Addresses:</h4>
              ) : (
                <h4>Address:</h4>
              )}
              {contact.addresses.map((address, index) => (
                <ul key={index}>
                  <li>{address.line_1}</li>
                  {address.line_2 && <li>{address.line_2}</li>}

                  <li>{address.zip_code}</li>
                  <li>{address.city}</li>
                  <li>{address.state}</li>
                </ul>
              ))}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
