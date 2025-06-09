"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { juniorProjectIdeas, plenoOrPlusProjectIdeas } from "@/projects/projectIdeas";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

type Project = (typeof juniorProjectIdeas)[0] | (typeof plenoOrPlusProjectIdeas)[0];

export default function Home() {
  const [level, setLevel] = useState<"junior" | "pleno">("junior");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getRandomProject = () => {
    const projects = level === "junior" ? juniorProjectIdeas : plenoOrPlusProjectIdeas;
    const randomIndex = Math.floor(Math.random() * projects.length);
    setSelectedProject(projects[randomIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-black via-[#0d0d2b] to-black text-white">
      <main className="flex flex-col items-center px-4 py-16 flex-grow">
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text mb-4">
            Projetos para seu Portfólio
          </h1>
          <p className="text-lg text-gray-400">
            Gere uma ideia de projeto 100% grátis para praticar e publicar no GitHub!
          </p>
        </div>

        <Select
          value={level}
          onValueChange={(value) => {
            setLevel(value as "junior" | "pleno");
            setSelectedProject(null);
          }}
        >
          <SelectTrigger className="w-[180px] mb-6">
            <SelectValue placeholder="Selecione o nível do projeto" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Nível do Projeto</SelectLabel>
              <SelectItem value="junior">Projeto Júnior</SelectItem>
              <SelectItem value="pleno">Projeto Pleno</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>


        <Button
          onClick={getRandomProject}
          className="cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out mb-10"
        >
          🎲 Gerar Projeto Aleatório
        </Button>

        {selectedProject && (
          <Card className="w-full max-w-xl bg-[#111827] border border-blue-800 shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-3">
                {selectedProject.title}
              </h2>
              <p className="text-gray-300 text-md leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    className="bg-[#1e293b] border border-cyan-600 text-sm text-white px-3 py-1 rounded-full"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="w-full border-t border-blue-900 py-6 text-center text-sm text-gray-500 bg-black">
        Desenvolvido por Victor Hugo — tudo 100% gratuito
      </footer>
    </div>
  );
}
