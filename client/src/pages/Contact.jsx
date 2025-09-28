import React from 'react';
// import { ChevronDownIcon } from '@heroicons/react/16/solid' // Icône toujours commentée

export default function ContactComponent() {
  return (
    // CONTENEUR GLOBAL: Changement de bg-gray-900 à bg-[#fdf6ec] (beige très clair)
    <div className="isolate bg-[#fdf6ec] px-6 py-24 sm:py-32 lg:px-8">
      
      {/* EFFET DE FOND (Gradiant) :
        Ajustement des couleurs de l'effet d'arrière-plan pour correspondre au thème. 
        Note : Les classes Tailwind personnalisées comme 'aspect-1155/678' ou 'w-144.5' 
        sont conservées, mais les couleurs 'from-[#ff80b5] to-[#9089fc]' sont modifiées.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          // Couleurs de gradiant ajustées : du beige clair au marron (degradé subtil sur fond clair)
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#d4bfa4] to-[#a27c56] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        {/* TITRE : Changement de text-white à text-[#6b4226] (marron foncé) */}
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-[#6b4226] sm:text-5xl">Contactez-nous</h2>
        {/* PARAGRAPHE : Changement de text-gray-400 à text-stone-600 */}
        <p className="mt-2 text-lg/8 text-stone-600">
            Une question sur un produit ? Besoin d'aide pour une commande ? Écrivez-nous !
        </p>
      </div>

      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          {/* Nom */}
          <div>
            {/* LABEL : Changement de text-white à text-[#6b4226] */}
            <label htmlFor="Nom" className="block text-left text-sm/6 font-semibold text-[#6b4226]">
              Nom
            </label>
            <div className="mt-2.5">
              <input
                id="Nom"
                name="Nom"
                type="text"
                autoComplete="given-name"
                // INPUT STYLING: bg-white, border-[#d4bfa4] et focus:outline-[#8b5e3c]
                className="block w-full rounded-md border-0 bg-white/70 px-3.5 py-2 text-base text-[#6b4226] shadow-sm ring-1 ring-inset ring-[#d4bfa4] placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-[#8b5e3c] sm:text-sm/6"
              />
            </div>
          </div>
          
          {/* Prénom(s) */}
          <div>
            <label htmlFor="prenom" className="block text-left text-sm/6 font-semibold text-[#6b4226]">
              Prénom(s)
            </label>
            <div className="mt-2.5">
              <input
                id="prenom"
                name="prenom"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 bg-white/70 px-3.5 py-2 text-base text-[#6b4226] shadow-sm ring-1 ring-inset ring-[#d4bfa4] placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-[#8b5e3c] sm:text-sm/6"
              />
            </div>
          </div>
          
          {/* Adresse (changée de "Company" à "Adresse" pour plus de pertinence) */}
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-left text-sm/6 font-semibold text-[#6b4226]">
              Adresse
            </label>
            <div className="mt-2.5">
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="address-line1"
                className="block w-full rounded-md border-0 bg-white/70 px-3.5 py-2 text-base text-[#6b4226] shadow-sm ring-1 ring-inset ring-[#d4bfa4] placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-[#8b5e3c] sm:text-sm/6"
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-left text-sm/6 font-semibold text-[#6b4226]">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 bg-white/70 px-3.5 py-2 text-base text-[#6b4226] shadow-sm ring-1 ring-inset ring-[#d4bfa4] placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-[#8b5e3c] sm:text-sm/6"
              />
            </div>
          </div>
          
          {/* Téléphone (avec le select des opérateurs pour Madagascar) */}
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-left text-sm/6 font-semibold text-[#6b4226]">
              Téléphone
            </label>
            <div className="mt-2.5">
              <div 
                // Conteneur du téléphone stylisé pour un fond clair
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-[#d4bfa4] focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#8b5e3c] bg-white/70"
              >
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="operator" // Renommé 'operator' pour plus de clarté
                    name="operator"
                    autoComplete="tel-country-code" // AutoComplete plus précis
                    aria-label="Opérateur"
                    // STYLING SELECT : Ajusté pour le thème clair
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-2 pr-7 pl-3.5 text-base text-[#6b4226] focus:ring-0 focus:outline-none sm:text-sm/6"
                  >
                    <option>Orange</option>
                    <option>Airtel</option>
                    <option>Telma</option>
                    <option>Autre</option>
                  </select>
                  {/* Option pour réactiver l'icône si nécessaire (ChevronDownIcon) */}
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel" // Type plus précis
                  autoComplete="tel"
                  placeholder="03X XX XX XXX" 
                  // STYLING INPUT: bg-transparent, texte adapté au thème
                  className="block min-w-0 grow border-l border-[#d4bfa4] bg-transparent py-2 pr-3 pl-3 text-base text-[#6b4226] placeholder:text-stone-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-left text-sm/6 font-semibold text-[#6b4226]">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                // STYLING TEXTAREA
                className="block w-full rounded-md border-0 bg-white/70 px-3.5 py-2 text-base text-[#6b4226] shadow-sm ring-1 ring-inset ring-[#d4bfa4] placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-[#8b5e3c] sm:text-sm/6"
                defaultValue={''}
              />
            </div>
          </div>
          
          {/* Politique de Confidentialité (Traduit et adapté au thème) */}
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
                {/* Checkbox (Ajustement de l'indigo à #8b5e3c) */}
                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-stone-300/50 p-px outline-offset-2 outline-[#8b5e3c] transition-colors duration-200 ease-in-out has-checked:bg-[#8b5e3c] has-focus-visible:outline-2">
                    <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-stone-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                    <input
                        id="agree-to-policies"
                        name="agree-to-policies"
                        type="checkbox"
                        aria-label="Accepter la politique de confidentialité"
                        className="absolute inset-0 appearance-none focus:outline-hidden"
                    />
                </div>
            </div>
            {/* TEXTE DE POLITIQUE TRADUIT ET COLORÉ */}
            <label htmlFor="agree-to-policies" className="text-sm/6 text-stone-600">
              En cochant cette case, vous acceptez notre{' '}
              <a href="#" className="font-semibold whitespace-nowrap text-[#8b5e3c] hover:text-[#6b4226]">
                politique de confidentialité
              </a>
              .
            </label>
          </div>
        </div>

        {/* Bouton d'Envoi */}
        <div className="mt-10">
          <button
            type="submit"
            // BOUTON STYLING: bg-indigo-500 remplacé par bg-[#8b5e3c] et hover:bg-[#6b4226]
            className="block w-full rounded-md bg-[#8b5e3c] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#6b4226] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5e3c] transition duration-200"
          >
            Envoyer le Message
          </button>
        </div>
      </form>
    </div>
  )
}