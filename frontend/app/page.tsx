"use client"

import React, { useLayoutEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [responses, setResponses] = useState<string[]>([]);

  const sendMessage = () => {
    if (ws) {
      ws.send(message);
      setMessage('');
    }
  };

  useLayoutEffect(
    () => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      setResponses((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
    },
    []
  );

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">comcom</span>
          </a>
        </div>
      </header>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                      <label htmlFor="editor" className="sr-only">Publish post</label>
                      <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id="editor"
                      className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Write a something..."
                      />
                  </div>
              </div>
              <button onClick={sendMessage} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                  Send
              </button>
              {responses.map((response, index) => (
              <div className="mt-10 flex items-start gap-2.5">
                <img className="w-8 h-8 rounded-full" src="https://picsum.photos/seed/picsum/200/300" alt="Jese image"/>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{response}</p>
                </div>
              </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
