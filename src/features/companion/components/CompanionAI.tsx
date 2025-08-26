'use client';

import { useEffect, useRef, useState } from 'react'
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { addToSessionHistory } from '../actions/companion';
import { vapi } from '@/lib/vapi';
import groovyWalk from '@/config/groovy-walk.json';
import { Mic, MicOff, Phone, PhoneOff, Loader2 } from 'lucide-react';
import assistantAI from '@/config/assistantAI.json';
console.log(assistantAI)



enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionAI = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
    }
  }, [isSpeaking]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setMessages(prev => [{ role: message.role, content: message.transcript }, ...prev]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    }
  }, [companionId]);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    // @ts-expect-error
    vapi.start(assistantAI, assistantOverrides);
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  }

  const isCallActive = callStatus === CallStatus.ACTIVE;
  const isConnecting = callStatus === CallStatus.CONNECTING;

  return (
    <section className="flex flex-col h-[70vh] gap-6">
      {/* Avatar Section */}
      <section className="flex gap-8 max-sm:flex-col max-sm:gap-6">
        {/* Companion Avatar */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div
            className="relative w-40 h-40 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: getSubjectColor(subject),
              boxShadow: isSpeaking ? '0 0 20px rgba(99, 102, 241, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Static Image */}
            <div className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-500',
              isCallActive ? 'opacity-0' : 'opacity-100',
              isConnecting && 'animate-pulse'
            )}>
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={120}
                height={120}
                className="p-4"

              />
            </div>

            {/* Lottie Animation */}
            <div className={cn(
              'absolute inset-0 transition-opacity duration-500',
              isCallActive ? 'opacity-100' : 'opacity-0'
            )}>
              <Lottie
                lottieRef={lottieRef}
                animationData={groovyWalk}
                autoplay={false}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-bold text-2xl text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{topic}</p>
          </div>
        </div>

        {/* User Avatar & Controls */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
              <Image
                src={userImage}
                alt={userName}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-xl text-gray-800">{userName}</p>
          </div>

          {/* Microphone Button */}
          <button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-200 w-full justify-center",
              isCallActive
                ? "border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700"
                : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed",
              isMuted && "border-red-300 bg-red-50 text-red-600"
            )}
            onClick={toggleMicrophone}
            disabled={!isCallActive}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
            <span className="font-medium text-sm">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </button>

          {/* Call Button */}
          <button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 w-full justify-center",
              isCallActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700",
              isConnecting && "bg-blue-400 cursor-not-allowed"
            )}
            onClick={isCallActive ? handleDisconnect : handleCall}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : isCallActive ? (
              <>
                <PhoneOff className="w-5 h-5" />
                End Session
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Start Session
              </>
            )}
          </button>
        </div>
      </section>

      {/* Transcript Section */}
      <section className="flex-1 flex flex-col bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Conversation</h3>
        </div>

        <div
          ref={transcriptRef}
          className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-4"
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>Start a conversation with {name.split(' ')[0]}!</p>
              <p className="text-sm mt-2">Click "Start Session" to begin</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col space-y-1 p-4 rounded-xl max-w-[80%]",
                  message.role === 'assistant'
                    ? "bg-blue-100 border border-blue-200 self-start"
                    : "bg-green-100 border border-green-200 self-end ml-auto"
                )}
              >
                <span className="font-semibold text-sm text-gray-600">
                  {message.role === 'assistant'
                    ? name.split(' ')[0].replace(/[.,]/g, '')
                    : userName
                  }
                </span>
                <p className="text-gray-800 text-sm">{message.content}</p>
              </div>
            )).reverse()
          )}
        </div>

        <div className="bg-gradient-to-t from-white to-transparent h-8 pointer-events-none" />
      </section>
    </section>
  )
}

export default CompanionAI