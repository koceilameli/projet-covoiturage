"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Trajet = {
  depart: string;
  arrivee: string;
  date: string;
  places: string;
  prix: string;
  chauffeur: string;
};

type Demande = {
  passager: string;
  chauffeur: string;
  depart: string;
  arrivee: string;
  date: string;
  prix: string;
  message: string;
};

export default function Search() {

  const router = useRouter();

  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [date, setDate] = useState("");

  const [resultats, setResultats] = useState<Trajet[]>([]);


  // rechercher
  const rechercher = () => {

    const trajets: Trajet[] =
      JSON.parse(localStorage.getItem("trajets") || "[]");

    const filtres = trajets.filter((t) =>

      (!depart || t.depart.toLowerCase().includes(depart.toLowerCase())) &&
      (!arrivee || t.arrivee.toLowerCase().includes(arrivee.toLowerCase())) &&
      (!date || t.date === date)

    );

    setResultats(filtres);

  };


  // reserver
  const reserver = (t: Trajet) => {

    const user =
      JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {

      router.push("/login");
      return;

    }

    const demande: Demande = {

      passager: user.nom,
      chauffeur: t.chauffeur,
      depart: t.depart,
      arrivee: t.arrivee,
      date: t.date,
      prix: t.prix,
      message: ""

    };

    const anciennes =
      JSON.parse(localStorage.getItem("demandes") || "[]");

    anciennes.push(demande);

    localStorage.setItem(
      "demandes",
      JSON.stringify(anciennes)
    );

    alert("Réservation envoyée");

  };


  return (

    <main
      className="min-h-screen flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('/map-bg.jpg')" }}
    >

      <div className="bg-white/90 p-10 w-[500px]">

        <h1 className="text-3xl mb-4">

          Chercher un trajet

        </h1>


        {/* champs */}

        <input
          placeholder="Ville départ"
          value={depart}
          onChange={(e) => setDepart(e.target.value)}
          className="w-full p-3 mb-3 border"
        />


        <input
          placeholder="Ville arrivée"
          value={arrivee}
          onChange={(e) => setArrivee(e.target.value)}
          className="w-full p-3 mb-3 border"
        />


        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 mb-3 border"
        />


        <button
          onClick={rechercher}
          className="bg-black text-white w-full p-3"
        >

          Rechercher

        </button>


        {/* navigation */}

        <button
          onClick={() => router.push("/publier")}
          className="bg-green-600 text-white w-full p-3 mt-3"
        >

          Publier trajet

        </button>


        <button
          onClick={() => router.push("/demandes")}
          className="bg-blue-600 text-white w-full p-3 mt-3"
        >

          Demandes chauffeur

        </button>


        <button
          onClick={() => router.push("/demandes-passager")}
          className="bg-red-600 text-white w-full p-3 mt-3"
        >

          Mes réservations

        </button>


        <button
          onClick={() => router.push("/mes-trajets")}
          className="bg-gray-800 text-white w-full p-3 mt-3"
        >

          Mes trajets

        </button>



        {/* resultats */}

        {resultats.map((t, i) => (

          <div key={i}
            className="bg-white p-3 mt-3">

            <p>

              {t.depart} → {t.arrivee}

            </p>

            <p>

              Date : {t.date}

            </p>

            <p>

              Prix : {t.prix}$

            </p>

            <p>

              Chauffeur : {t.chauffeur}

            </p>


            <button
              onClick={() => reserver(t)}
              className="bg-green-600 text-white px-3 py-1"
            >

              Réserver

            </button>


            <button
              onClick={() => {

                localStorage.setItem("chatUser", t.chauffeur);

                router.push("/chat");

              }}
              className="bg-blue-600 text-white px-3 py-1 ml-2"
            >

              Message

            </button>


          </div>

        ))}


      </div>

    </main>

  );

}