"use client"

import { useState, useCallback } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { MessageBlock } from "@/components/message-block"
import { ContinueButton } from "@/components/continue-button"
import { FinalSection } from "@/components/final-section"
import { MusicToggle } from "@/components/music-toggle"

const messages = [
  "hey imene look i'm not just a lover , but i'm obssesed bik for this welit ngolk ela bezaf hajat ndabzo elihom sorry cuz britk gae kima haka bsh what ik that is impossible to leave u , u stuck with me okey ?",
  "ik rana ndabzo bezaf bsh just sm3i lhdrti kon dirili ri hadi lhaja kolchi ytrigl , yak tbrini ? ana important fi hyatk ? barynti for ever ? u can try for me ?",
  "just yak nbrik bezaf w endi ri nti , jamais z3ftk bhadra dor ki ndabzo like ngolk nti w ex taei ri kifkif ... try nti tani baby cuz u need to know beli anes maychofkch ri bnadem 3adi but ychofk bezaf swalh ay hadra menek tkhrb fi my feeling bezaf w ri nti li t9adi dirili hak kima t9adi tfrhini blkhof w kolchi ... ri ni ngolk ch3al nti important endi",
  "just ana nbrik bezaf w daymn nseyi ela khatrk men li 3rftk , kon t7ali lpc ntaei dayrlk note nktb fiha gae swalh li yfrhok w chatbri w katb beli mazal matrustitini w hajat li yrodok ttrustini w hajat li yz3fok telment nbrik",
  "so daymn nchirlk gifts cuz chftha haja tfrhk mayhamnich ch3al tklfni even mindak nchrilk w maykonch endi w nji ntmcha just nbri nchofk happy , ni ngolk haka bach t9adi ttkhyli ch3al nti ralya endi",
  "w daymn nseyi ela khatrk w fi last time hada welit ndir kolchi 3labali beli makich mtrusytni w matamnich hadrti w bezaf swalh aya welit ndir ay haja w my best bach nrodk ttrustini w kol haja ndirha ngol sayi men moraha ttrustini bach nkmlo hyatna raya w manzidoch ndabzo 3la haja",
  "bach imene ki tgol anes matkhmmch beli ykh3ha elabalha ch3al ybriha w elabalha chay9d ydir 3la khatrha , same for me ana tani mangolkch beli tkhd3ini",
  "bsh men mor li ndir kolchi aya nchofk same mazal matrsitinich so nz3f men rouhi ngol blk problem fiya w nji nhkilk w ndabzo hta ki matbynilich b ur actions wela ngol mazal mawltch obssesed biya kima ana rani m3aha w hadi haja dorni imene , cuz nbrik tchofini kima nchofk bach ntgdmo fi hyatna",
  "ana wlh la fotha nt3 nkhd3K w nhki m3a chiret w mena wlh bari ri nfwto w9t chbab hta li yji nhar nkono fi dar whda wlh wlh wlh , if mchiti m3aya omri radi ndork w omri radi nkhlik",
  "aya ela di nz3f menek ki nhsk mattrustinich w ana ntrustik w tani ki manchofkch tbynili beli tbrini ri actions sghar kima li ndirhomlk ana ... manich ngolk haka ela khatri bsh bnadem jay haka ki dirili haka tzidi tkhlini ncare elik",
  "cuz baby ki ng3d ri ndirlk haka w manchofkch nbda nkhaf ngol blk bdat tkrh meni wela radi tkhsrni hta ana nkhaf baby wlh",
  "apar ca baby men mor kolchi ana jamais di nkhlik",
  "help me i love u and i want u for ever ❤️",
]

export default function LovePage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([0])
  const [typingComplete, setTypingComplete] = useState<number[]>([])
  const [showFinal, setShowFinal] = useState(false)

  const handleTypingComplete = useCallback((index: number) => {
    setTypingComplete((prev) => [...prev, index])
  }, [])

  const handleContinue = () => {
    if (currentMessageIndex < messages.length - 1) {
      const nextIndex = currentMessageIndex + 1
      setCurrentMessageIndex(nextIndex)
      setVisibleMessages((prev) => [...prev, nextIndex])
    } else {
      setShowFinal(true)
    }
  }

  const isLastMessage = currentMessageIndex === messages.length - 1
  const showContinueButton =
    typingComplete.includes(currentMessageIndex) && !showFinal

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-pink-900 relative overflow-x-hidden">
      <FloatingHearts />
      <MusicToggle />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-pulse-glow mb-4">
            For You, Imene
          </h1>
          <p className="text-lg md:text-xl text-pink-200/80 text-glow">
            A message from my heart to yours
          </p>
        </header>

        <div className="space-y-8 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <MessageBlock
              key={index}
              message={message}
              isVisible={visibleMessages.includes(index)}
              onComplete={() => handleTypingComplete(index)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <ContinueButton
            onClick={handleContinue}
            isVisible={showContinueButton}
          />
          {showContinueButton && isLastMessage && (
            <p className="mt-4 text-pink-300/60 text-sm animate-fade-in">
              One last step...
            </p>
          )}
        </div>

        <FinalSection isVisible={showFinal} />
      </div>

      {/* Ambient glow effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
    </main>
  )
}
