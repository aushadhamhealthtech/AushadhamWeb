"use client";

import { useState } from "react";
import {
  Paperclip,
  MessageCircle,
  Smile,
  Mic,
  Send,
  Plus,
  FileText,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/context/user";
import { PatientSidebar } from "../PatientSidebar";
import { chatMessages } from "../data";

export function ChatTab({ patient }: { patient: any }) {
  const [message, setMessage] = useState("");
  const { displayName } = useUser();

  return (
    <div className="flex flex-1 overflow-hidden">
      <PatientSidebar patient={patient} />
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-5">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-lg ${msg.sender === "doctor" ? "text-right" : ""}`}>
                  {/* Sender name + time */}
                  <div className={`flex items-center gap-2 mb-1.5 ${msg.sender === "doctor" ? "justify-end" : ""}`}>
                    <span className={`text-xs font-semibold ${msg.sender === "doctor" ? "text-teal-700" : "text-teal-600"}`}>
                      {msg.name}
                    </span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>

                  {/* Message bubble */}
                  <div className={`flex items-end gap-2 ${msg.sender === "doctor" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className={`text-xs font-semibold ${msg.sender === "doctor" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"}`}>
                        {msg.sender === "doctor" ? "DW" : "KJ"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" aria-label="Message options" className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-3 h-3 text-gray-400" />
                      </Button>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender === "doctor"
                            ? "bg-teal-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-700 rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>

                  {/* Emoji reaction */}
                  {msg.emoji && (
                    <div className={`mt-1 ${msg.sender === "doctor" ? "text-right mr-10" : "ml-10"}`}>
                      <span className="text-sm">{msg.emoji}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Lab document shared notification */}
            <div className="flex justify-center my-4">
              <span className="text-xs text-gray-400">Today, 14 Jan, 2025</span>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-red-600" />
              </div>
              <span className="text-sm text-gray-700 flex-1">
                Lab test document has been shared by {displayName}
              </span>
              <button className="text-sm text-teal-600 font-medium underline hover:text-teal-700">
                View now
              </button>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-100 p-4 bg-white shrink-0">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
            <Button variant="ghost" size="icon" aria-label="Add attachment" className="w-8 h-8 p-0 text-teal-600 hover:text-teal-700">
              <Plus className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm"
            />
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Add emoji" className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Record audio" className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600">
                <Mic className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Attach file" className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button size="icon" aria-label="Send message" className="w-8 h-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
