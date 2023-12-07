import Image from "next/image";
import React, { useState, useEffect } from "react";
import SiteSettings from "../../utils/SiteSettings";
import { callOpenAi } from "../../utils/openai"
import  ButtonOnPage  from "../../components/misc/ButtonOnPage"
import { useRouter } from 'next/router'


const OpenaiPlayground = () => {

  
  //const systemPrompts = [
    //{"role":"system", "content": "Reply 'navigate_to_contacts' when asked about contacting a live person or agent. Reply 'navigate_to_bookings' when asked about appointments or bookings. When asked to provide information about yourself, explain what you are. When asked about anything but appointments, bookings, contacting a live agent, or providing information about yourself, politely reply that you cannot engage in general conversations and add an encouraging quote."},
    //]
  
  const router = useRouter();
  const [messages, setMessages] = useState([
    
  ])

  const [newMessage, setNewMessage] = useState()

  const processAiCommand = (message) => {
    const commandList = process.env.NEXT_PUBLIC_OPENAI_API_COMMANDS.split(',');
    var processed = false
    commandList.map((cmd) => {
      var command = cmd.split(':');
      if(message.indexOf(command[0]) > -1){
        router.push(command[1]);
        processed = true
      }
      
     })
     return processed
  }

  useEffect( () => {
    if(messages.length > 0 && messages[messages.length - 1].role == "user")
    {
      //"gpt-3.5-turbo"
      //var firstPart = messages.slice(0, messages.length - 1);
      

      callOpenAi(
            messages
          ).then((result) =>{
            if(result?.data && result?.data?.choices.length > 0){
              if(!processAiCommand(result?.data?.choices[0].message.content)){
                setMessages([
                  ...messages,
                  {"role" : "assistant", "content" : result?.data?.choices[0].message.content}
                ])
              }
              
            }

          })
    }
  }, [messages]);


  const onChangeMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const openAiCall = () => {
    setTimeout(() => {
      setMessages([
        ...messages,
        {"role" : "user", "content" : newMessage}
      ])
    }, 100);
  }

  const getParticipantName = (s) => 
  {
    return s == "user" ? "You" : "Assistant"
  }

  return (
    <>
    <div className="w-full font-normal">
      <div className="w-full"><p className="font-bold">{SiteSettings.AskAssistantTitle}</p><input className="ai_input w-full " maxLength={process.env.NEXT_PUBLIC_OPENAI_API_INPUT_LENGTH} onChange={onChangeMessage} type="text" ></input></div>
      <div className="w-full"> 

      <ButtonOnPage  onClick={openAiCall}>Submit</ButtonOnPage>

      
      </div>

      <div className="w-full mt-2">
        {messages.slice(0).reverse().map((message) => (
               <>
                 <p><span className="font-bold">{getParticipantName(message.role)}:</span> {message.content}</p>
               </>
          )
        )
        }
      </div>
    </div>
    </>
  );
};

export default OpenaiPlayground;
