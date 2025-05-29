import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
     <h1 className='text-center text-4xl font-bold text-gray-600'>À propos</h1>
     <div className='my-7 flex flex-col md:flex-row gap-12'>
      <img className='w-full md:max-w-[600px]' src={assets.about_image}/>
      <div className='flex flex-row justify-center pt-3'>
        <p>Bienvenue sur BookDoc site web – votre solution simple, rapide et sécurisée pour prendre rendez-vous avec un professionnel de santé.

Dans un monde où tout va vite, accéder à des soins de qualité ne devrait pas être compliqué. C’est pourquoi nous avons créé BookDok : pour connecter les patients avec les bons médecins, au bon moment, en quelques clics seulement.
<br />
💡 Notre mission
Simplifier l accès aux soins de santé en permettant aux patients de trouver facilement un médecin de confiance et de prendre rendez-vous en ligne, sans attente ni stress.
<br/>
🏥 Nos services:
<br/>
Recherche simplifiée de médecins : par spécialité, lieu, disponibilité ou avis.
<br/>
Prise de rendez-vous instantanée : 24h/24, 7j/7.
<br />
Profils vérifiés : diplômes, expériences et avis authentiques.
<br />
👩‍⚕️ À qui s’adresse BookDoc ?
<br />
Aux patients qui veulent des soins médicaux accessibles et rapides.
<br />
Aux professionnels de santé qui souhaitent gérer leurs rendez-vous plus efficacement.
<br />
🤝 Pourquoi nous choisir ?
<br />
- Plateforme sécurisée et facile à utiliser
<br />
-Large réseau de médecins certifiés
<br />
-Avis transparents des patients
<br />
-Service client à votre écoute
<br />
-Accessible depuis ordinateur, tablette et mobile

</p>
      </div>
     </div>
    </div>
  )
}

export default About
