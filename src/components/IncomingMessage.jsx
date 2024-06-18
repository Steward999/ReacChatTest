// /* eslint-disable react/prop-types */
// // import React from 'react';

// import React, { useState, useEffect } from 'react';
// import { horaMes } from '../helpers/horaMes'
// import axios from 'axios';

// // meter en el env 
// const ACCESS_TOKEN = 'EAALMI4SPZByEBO2EzjnWkNEeY0LZCAJzvZCIpKlVZBAUWwOrM5qT91U2Ug3JPiw6nxt02XkZA6bWZAK2S6O3nyzaDuGjUATwjEjVUheEnjIxeM7lKgGDNOZAiViUWd3pLR1mZAhK9AcdwQZB19rEBt9p8gi0eF3Hs2ZAwMZBomQgRLwwfyATzK4FYBEZAEQHiAQAZBxzXUMPaLDDHFOQPvWhW';
// const IncomingMessage = ({msg}) => {

//   const [imageUrl, setImageUrl] = useState('');

// //  console.log('incomingmsg',msg);


//  useEffect(() => {
//   if (msg.type === 'image') {
//     const fetchImageUrl = async () => {
//       try {
//         const response = await axios.get(`https://graph.facebook.com/v20.0/${msg.idImage}`, {
//           headers: {
//             Authorization: `Bearer ${ACCESS_TOKEN}`,
//           },
//         });
//         console.log(response.data.url);
//         setImageUrl(response.data.url); // Ajusta según la estructura de la respuesta
//       } catch (error) {
//         console.error('Error al obtener la imagen:', error);
//       }
//     };

//     fetchImageUrl();
//   }
// }, [msg]);

//   return (
       
    
//         // <div className="incoming_msg">
     
//         // <div className="received_msg">
//         //     <div className="received_withd_msg">
//         //         <p>{msg.mensaje}</p>
//         //         <span className="time_date"> { horaMes(msg.createdAt) }</span>
//         //     </div>
//         // </div>
//         //  </div>

//         <div className="incoming_msg">
      
//         <div className="received_msg">
//           <div className="received_withd_msg">
//             {msg.type === 'text' ? (
//               <p>{msg.mensaje}</p>
//             ) : (
//               <img src={imageUrl} alt="Received content" style={{ maxWidth: '100%', height: 'auto' }} />
//             )}
//             <span className="time_date"> {horaMes(msg.createdAt)}</span>
//           </div>
//         </div>
//       </div>

       

//   )
// }

// export default IncomingMessage



/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { horaMes } from '../helpers/horaMes';

const ACCESS_TOKEN = 'EAALMI4SPZByEBO2EzjnWkNEeY0LZCAJzvZCIpKlVZBAUWwOrM5qT91U2Ug3JPiw6nxt02XkZA6bWZAK2S6O3nyzaDuGjUATwjEjVUheEnjIxeM7lKgGDNOZAiViUWd3pLR1mZAhK9AcdwQZB19rEBt9p8gi0eF3Hs2ZAwMZBomQgRLwwfyATzK4FYBEZAEQHiAQAZBxzXUMPaLDDHFOQPvWhW';

const IncomingMessage = ({ msg }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    if (msg.type === 'image') {
      const fetchImageUrl = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://graph.facebook.com/v20.0/${msg.idImage}`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          });
          console.log('Image URL received:', response.data.url);

          if (!response.data.url) {
            throw new Error('URL de imagen no encontrada');
          }

          // Segunda petición para descargar la imagen
          const downloadResponse = await axios.get(response.data.url, {
            responseType: 'arraybuffer', // Para manejar la respuesta como un flujo de bytes binarios
          });

          // Verificar si la respuesta es exitosa
          if (downloadResponse.status !== 200) {
            throw new Error('Error al obtener la imagen');
          }

          // Obtener el tipo de contenido de la respuesta
          const contentType = downloadResponse.headers['content-type'];
          console.log(contentType);

          // Verificar si el tipo de contenido es una imagen JPEG
          // if (contentType && contentType.includes('image/jpeg')) {
            // Aquí tienes el buffer binario de la imagen JPEG
            const buffer = downloadResponse.data;
            console.log(buffer);
            // Puedes procesar el buffer como necesites, por ejemplo:
            // const blob = new Blob([downloadResponse.data], { type: 'image/jpeg' });
            const blob = new Blob([buffer], { type: 'image/jpeg' });

            console.log(blob);
            const imageUrl = URL.createObjectURL(blob);
            console.log('iamgeurl', imageUrl);

            setImageUrl(imageUrl);
            setLoading(false);
          // } else {
          //   throw new Error('El contenido no es una imagen JPEG');
          // }
        } catch (error) {
          console.error('Error al obtener la imagen:', error);
          setLoading(false);
        }
      };
      fetchImageUrl();
    }
  }, [msg]);

  
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          {msg.type === 'text' ? (
            <p>{msg.mensaje}</p>
          ) : (
            <>
              {loading ? (
                <p>Loading image...</p>
              ) : (
                console.log(imageUrl),
                <img src={imageUrl}  style={{ maxWidth: '100%', height: 'auto' }} />
                

              )}
            </>
          )}
          <span className="time_date"> {horaMes(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingMessage;