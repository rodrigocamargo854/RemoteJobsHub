"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PreachersHub() {
  const [preachers, setPreachers] = useState([]);

  useEffect(() => {
    fetch("/preachers")
      .then((res) => res.json())
      .then(setPreachers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-8">
        Nossos Pregadores
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {preachers.map((preacher, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-all"
          >
            <Image
              src={preacher.picture || "/noimage.png"}
              alt={preacher.name}
              width={120}
              height={120}
              className="rounded-full border border-gray-300"
            />
            <h2 className="text-xl font-semibold mt-4 text-gray-800">{preacher.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{preacher.info}</p>
            {preacher.calendar ? (
              <Link
                href={preacher.calendar}
                target="_blank"
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
              >
                Ver Agenda
              </Link>
            ) : (
              <p className="text-gray-500 text-sm mt-4">Agenda não disponível</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
