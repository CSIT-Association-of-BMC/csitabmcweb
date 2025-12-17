"use client";
import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import Aos from "aos";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

// Custom circular logo node
const LogoNode = () => {
  return (
    <div className="relative">
      <Handle type="source" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />

      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white border border-slate-200">
        <Image
          src="https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
          alt="CSIT Association"
          width={56}
          height={56}
          className="w-14 h-14 object-contain"
        />
      </div>
    </div>
  );
};

// Minimal pill node style
const pillStyle = {
  background: "white",
  color: "#2b3870",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: "500",
};

const nodeTypes = { logo: LogoNode };

const initialNodes: Node[] = [
  {
    id: "1",
    type: "logo",
    position: { x: 240, y: 160 },
    data: {},
    draggable: false,
  },
  {
    id: "2",
    type: "default",
    position: { x: 80, y: 60 },
    data: { label: "Events" },
    style: pillStyle,
  },
  {
    id: "3",
    type: "default",
    position: { x: 380, y: 60 },
    data: { label: "Hackathons" },
    style: pillStyle,
  },
  {
    id: "4",
    type: "default",
    position: { x: 50, y: 280 },
    data: { label: "Mentorship" },
    style: pillStyle,
  },
  {
    id: "5",
    type: "default",
    position: { x: 400, y: 280 },
    data: { label: "Workshops" },
    style: pillStyle,
  },
  {
    id: "6",
    type: "default",
    position: { x: 230, y: 20 },
    data: { label: "Community" },
    style: pillStyle,
  },
  {
    id: "7",
    type: "default",
    position: { x: 210, y: 320 },
    data: { label: "Open Source" },
    style: pillStyle,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: { stroke: "#cbd5e1", strokeWidth: 1 },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    style: { stroke: "#cbd5e1", strokeWidth: 1 },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    style: { stroke: "#cbd5e1", strokeWidth: 1 },
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    style: { stroke: "#cbd5e1", strokeWidth: 1 },
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    style: { stroke: "#cbd5e1", strokeWidth: 1 },
  },
  {
    id: "e1-7",
    source: "1",
    target: "7",
    style: { stroke: "#cbd5e1", strokeWidth: 1 },
  },
];

const HeroLander = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  useEffect(() => {
    Aos.init({ easing: "ease", duration: 500 });
  }, []);

  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] flex items-center bg-white"
      id="home"
    >
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left */}
          <div className="space-y-6" data-aos="fade-up">
            <span className="inline-block text-xs font-medium tracking-widest text-[#2b3870] uppercase">
              Since 2016
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              CSIT Association
              <span className="text-[#2b3870]"> of BMC</span>
            </h1>

            <p className="text-slate-500 text-base leading-relaxed max-w-md">
              Non-profit, student-led, and future-focused. Building spaces where
              IT students learn, ship, and grow together.
            </p>

            <div className="text-base font-medium text-[#2b3870]">
              <Typewriter
                options={{
                  strings: [
                    "Non Political",
                    "Technological",
                    "Non Profit",
                    "Community Driven",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/about">
                <Button className="bg-[#2b3870] hover:bg-[#1f2a52] text-white px-6 h-10 text-sm font-medium group">
                  About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 px-6 h-10 text-sm font-medium"
                >
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - React Flow */}
          <div
            className="h-[400px] lg:h-[420px]"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
              fitView
              fitViewOptions={{ padding: 0.15 }}
              panOnDrag={false}
              panOnScroll={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              preventScrolling={true}
              nodesDraggable={true}
              nodesConnectable={false}
              elementsSelectable={false}
              proOptions={{ hideAttribution: true }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLander;
