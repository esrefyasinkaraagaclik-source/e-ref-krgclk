import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCurriculum } from "../contexts/CurriculumContext";
import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft, Trophy } from "lucide-react";
import { MoleculeViewer } from "../components/MoleculeViewer";
import { MatchingGame } from "../components/MatchingGame";
import { MindmapActivity } from "../components/MindmapActivity";
import { Leaderboard } from "../components/Leaderboard";
import { ReactionGame } from "../components/ReactionGame";
import { ClassificationGame } from "../components/ClassificationGame";
import { ReactionClassificationGame } from "../components/ReactionClassificationGame";
import { MoleCalculationGame } from "../components/MoleCalculationGame";

export function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, completeModule, awardBadge, submitScore } = useAuth();
  const { konular: curriculum, loading } = useCurriculum();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [quizFinished, setQuizFinished] = useState(false);
  const [matchingFinished, setMatchingFinished] = useState(false);
  const [mindmapFinished, setMindmapFinished] = useState(false);
  const [reactionFinished, setReactionFinished] = useState(false);
  const [classificationFinished, setClassificationFinished] = useState(false);
  const [reactionClassificationFinished, setReactionClassificationFinished] =
    useState(false);
  const [moleCalculationFinished, setMoleCalculationFinished] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"theory" | "activity">("theory");

  if (loading)
    return (
      <div className="text-center py-20 text-slate-400">Yükleniyor...</div>
    );

  
  let moduleData = null;
  let konuData = null;
  for (const konu of curriculum) {
    const mod = konu.modules.find((m) => m.id === moduleId);
    if (mod) {
      moduleData = mod;
      konuData = konu;
      break;
    }
  }

  
  useEffect(() => {
    if (moduleData) {
      
      if (location.state?.initialTab) {
        setActiveTab(location.state.initialTab);
      } else if (!moduleData.theory && moduleData.type !== "lesson") {
        
        setActiveTab("activity");
      }
      
      if (
        userProfile &&
        userProfile.completedModules?.includes(moduleData.id)
      ) {
        setCompleted(true);
      }
    }
  }, [userProfile, moduleData, location.state]);

  if (!moduleData || !konuData) {
    return (
      <div className="text-center py-20 text-slate-400">Modül bulunamadı.</div>
    );
  }

  const handleComplete = async () => {
    if (!completed) {
      const isFirst = userProfile?.completedModules?.length === 0;

      await completeModule(moduleData.id);

      
      if (isFirst) {
        await awardBadge("kimya_kasifi");
      }

      setCompleted(true);
    }
    navigate(location.state?.initialTab === 'activity' ? '/games' : location.state?.initialTab === 'theory' ? '/lectures' : '/map');
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    const correct = index === moduleData.questions![currentQuestion].answer;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const nextQuestion = async () => {
    if (currentQuestion < (moduleData.questions?.length ?? 1) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      if (!scoreSubmitted) {
        const finalScore = Math.round(
          (correctAnswers / (moduleData.questions?.length ?? 1)) * 1000,
        );
        await submitScore(moduleData!.id, finalScore);
        setScoreSubmitted(true);
      }
    }
  };

  const handleMatchingComplete = async (score: number) => {
    setMatchingFinished(true);
    if (!scoreSubmitted) {
      await submitScore(moduleData!.id, score);
      setScoreSubmitted(true);
    }
  };

  const handleMindmapComplete = async (score: number) => {
    setMindmapFinished(true);
    if (!scoreSubmitted) {
      await submitScore(moduleData!.id, score);
      setScoreSubmitted(true);
    }
  };

  const handleReactionComplete = async (score: number) => {
    setReactionFinished(true);
    if (!scoreSubmitted) {
      await submitScore(moduleData!.id, score);
      setScoreSubmitted(true);
    }
  };

  const handleClassificationComplete = async (score: number) => {
    setClassificationFinished(true);
    if (!scoreSubmitted) {
      await submitScore(moduleData!.id, score);
      setScoreSubmitted(true);
    }
  };

  const handleReactionClassificationComplete = async (score: number) => {
    setReactionClassificationFinished(true);
    if (!scoreSubmitted) {
      await submitScore(moduleData!.id, score);
      setScoreSubmitted(true);
    }
  };

  const handleMoleCalculationComplete = async (score: number) => {
    setMoleCalculationFinished(true);
    if (!scoreSubmitted) {
      await submitScore(moduleData!.id, score);
      setScoreSubmitted(true);
    }
  };

  const renderTheory = (blocks: any[]) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {blocks.map((block) => (
        <div key={block.id}>
          {block.type === "text" && (
            <div className="prose prose-invert max-w-none">
              {block.text?.split("\n").map((paragraph: string, idx: number) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={idx} className="text-slate-300 ml-4 mb-2">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                if (paragraph.trim() === "") return <br key={idx} />;

                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-lg">
                    {parts.map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i} className="text-white font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                );
              })}
            </div>
          )}

          {block.type === "image" && block.imageUrl && (
            <div className={`flex ${block.imageAlign === "left" ? "justify-start" : block.imageAlign === "right" ? "justify-end" : "justify-center"} my-6`}>
              <img
                src={block.imageUrl}
                alt="Teorik İçerik"
                className="max-h-96 rounded-xl border border-slate-700/50 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {block.type === "molecule" && block.molecule && (
            <div className="my-8">
              <h4 className="text-lg font-medium text-white mb-4">
                {block.molecule.name} ({block.molecule.formula})
              </h4>
              <MoleculeViewer model={block.molecule} />
            </div>
          )}
        </div>
      ))}
      <div className="pt-8 border-t border-white/10 flex justify-center">
        <button
          onClick={() => setActiveTab("activity")}
          className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-cyan-500/30 font-medium transition-all flex items-center gap-2 group"
        >
          Konuyu Öğrendim, Eğitici Oyuna Başla
          <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-12 px-4">
      <button
        onClick={() => navigate(location.state?.initialTab === 'activity' ? '/games' : location.state?.initialTab === 'theory' ? '/lectures' : '/map')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Haritaya Dön
      </button>

      <div className="mb-8">
        <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
          {konuData.title}
        </div>
        <h1 className="text-3xl font-bold font-display text-white mb-4">
          {moduleData.title}
        </h1>

        <div className="flex items-center gap-4">
          {completed && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Tamamlandı
            </span>
          )}
        </div>
      </div>

      {}
      {(moduleData.theory || moduleData.type === "lesson") && moduleData.type !== "quiz" && (
        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-2xl w-fit border border-white/10">
          <button
            onClick={() => setActiveTab("theory")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "theory"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Konu Anlatımı
          </button>
          {moduleData.type !== "lesson" && (
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "activity"
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Eğitici Oyun
            </button>
          )}
        </div>
      )}

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 sm:p-8 border-cyan-500/20 w-full"
      >
        {activeTab === "theory" ? (
          <div>
            {moduleData.theory ? (
              renderTheory(moduleData.theory)
            ) : moduleData.type === "lesson" ? (
              
              <div className="space-y-8">
                {moduleData.blocks && moduleData.blocks.length > 0 ? (
                  <div className="space-y-8">
                    {moduleData.blocks.map((block) => (
                      <div key={block.id}>
                        {block.type === "text" && (
                          <div className="prose prose-invert max-w-none">
                            {block.text?.split("\n").map((paragraph, idx) => {
                              if (
                                paragraph.startsWith("**") &&
                                paragraph.endsWith("**")
                              ) {
                                return (
                                  <h3
                                    key={idx}
                                    className="text-xl font-bold text-white mt-6 mb-3"
                                  >
                                    {paragraph.replace(/\*\*/g, "")}
                                  </h3>
                                );
                              }
                              if (paragraph.startsWith("- ")) {
                                return (
                                  <li
                                    key={idx}
                                    className="text-slate-300 ml-4 mb-2"
                                  >
                                    {paragraph.substring(2)}
                                  </li>
                                );
                              }
                              if (paragraph.trim() === "") return <br key={idx} />;

                              const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                              return (
                                <p
                                  key={idx}
                                  className="text-slate-300 leading-relaxed mb-4 text-lg"
                                >
                                  {parts.map((part, i) =>
                                    part.startsWith("**") && part.endsWith("**") ? (
                                      <strong
                                        key={i}
                                        className="text-white font-semibold"
                                      >
                                        {part.slice(2, -2)}
                                      </strong>
                                    ) : (
                                      part
                                    ),
                                  )}
                                </p>
                              );
                            })}
                          </div>
                        )}

                        {block.type === "image" && block.imageUrl && (
                          <div
                            className={`flex ${block.imageAlign === "left" ? "justify-start" : block.imageAlign === "right" ? "justify-end" : "justify-center"} my-6`}
                          >
                            <img
                              src={block.imageUrl}
                              alt="Ders İçeriği"
                              className="max-h-96 rounded-xl border border-slate-700/50 shadow-lg"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        {block.type === "molecule" && block.molecule && (
                          <div className="my-8">
                            <h4 className="text-lg font-medium text-white mb-4">
                              {block.molecule.name} ({block.molecule.formula})
                            </h4>
                            <MoleculeViewer model={block.molecule} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    {moduleData.content?.split("\n").map((paragraph, idx) => {
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return (
                          <h3
                            key={idx}
                            className="text-xl font-bold text-white mt-6 mb-3"
                          >
                            {paragraph.replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith("- ")) {
                        return (
                          <li key={idx} className="text-slate-300 ml-4 mb-2">
                            {paragraph.substring(2)}
                          </li>
                        );
                      }
                      if (paragraph.trim() === "") return <br key={idx} />;

                      
                      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p
                          key={idx}
                          className="text-slate-300 leading-relaxed mb-4 text-lg"
                        >
                          {parts.map((part, i) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={i} className="text-white font-semibold">
                                {part.slice(2, -2)}
                              </strong>
                            ) : (
                              part
                            ),
                          )}
                        </p>
                      );
                    })}
                  </div>
                )}

                <div className="pt-8 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleComplete()}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15_rgba(6,182,212,0.3)] flex items-center gap-2"
                  >
                    {completed ? "Haritaya Dön" : "Dersi Bitir"}
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                Bu modül için konu anlatımı bulunmamaktadır. Lütfen "Eğitici Oyun" sekmesine geçin.
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            {}
            {}
            {moduleData.type === "mole-calculation" &&
              moduleData.moleCalculations && (
                <div className="space-y-8">
                  {!moleCalculationFinished ? (
                    <MoleCalculationGame
                      data={moduleData.moleCalculations[0]}
                      onComplete={handleMoleCalculationComplete}
                    />
                  ) : (
                    <TrophySummary 
                      title="Hesaplamalar Tamamlandı!" 
                      score={(correctAnswers / (moduleData.questions?.length ?? 1)) * 1000}
                      onComplete={handleComplete}
                      isCompleted={completed}
                    />
                  )}
                </div>
              )}

            {}
            {moduleData.type === "reaction-classification" &&
              moduleData.reactionClassifications && (
                <div className="space-y-8">
                  {!reactionClassificationFinished ? (
                    <ReactionClassificationGame
                      data={moduleData.reactionClassifications[0]}
                      onComplete={handleReactionClassificationComplete}
                    />
                  ) : (
                    <TrophySummary 
                      title="Sınıflandırma Tamamlandı!" 
                      onComplete={handleComplete}
                      isCompleted={completed}
                    />
                  )}
                </div>
              )}

            {}
            {moduleData.type === "classification" && moduleData.classifications && (
              <div className="space-y-8">
                {!classificationFinished ? (
                  <ClassificationGame
                    data={moduleData.classifications[0]}
                    onComplete={handleClassificationComplete}
                  />
                ) : (
                   <TrophySummary 
                      title="Sınıflandırma Tamamlandı!" 
                      onComplete={handleComplete}
                      isCompleted={completed}
                    />
                )}
              </div>
            )}

            {}
            {moduleData.type === "reaction" && moduleData.reactions && (
              <div className="space-y-8">
                {!reactionFinished ? (
                  <ReactionGame
                    reactions={moduleData.reactions}
                    onComplete={handleReactionComplete}
                  />
                ) : (
                  <TrophySummary 
                    title="Laboratuvar Tamamlandı!" 
                    onComplete={handleComplete}
                    isCompleted={completed}
                  />
                )}
              </div>
            )}

            {}
            {moduleData.type === "interactive" && moduleData.models && (
              <div className="space-y-8">
                <p className="text-slate-300 leading-relaxed text-lg mb-6">
                  Aşağıdaki 3 boyutlu molekül modellerini inceleyin. Modelleri
                  farenizle sürükleyerek döndürebilir ve yapısını yakından
                  görebilirsiniz.
                </p>

                <div className="space-y-12">
                  {moduleData.models.map((model, idx) => (
                    <MoleculeViewer key={idx} model={model} />
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleComplete()}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
                  >
                    {completed ? "Haritaya Dön" : "İncelemeyi Bitir"}
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {}
            {moduleData.type === "matching" && moduleData.pairs && (
              <div className="space-y-8">
                <MatchingGame
                  pairs={moduleData.pairs}
                  onComplete={handleMatchingComplete}
                />

                {matchingFinished && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-8 border-t border-white/10"
                  >
                    <div className="mb-8">
                      <Leaderboard />
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => handleComplete()}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
                      >
                        {completed ? "Haritaya Dön" : "Devam Et"}
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {}
            {moduleData.type === "mindmap" && moduleData.mindmapNodes && (
              <div className="space-y-8">
                <MindmapActivity
                  nodes={moduleData.mindmapNodes}
                  centralText={moduleData.title}
                  onComplete={handleMindmapComplete}
                />

                {mindmapFinished && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-8 border-t border-white/10"
                  >
                    <div className="mb-8">
                      <Leaderboard />
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => handleComplete()}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
                      >
                        {completed ? "Haritaya Dön" : "Etkinliği Bitir"}
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {}
            {moduleData.type === "quiz" &&
              moduleData.questions &&
              !quizFinished && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      Soru {currentQuestion + 1} /{" "}
                      {moduleData.questions?.length ?? 0}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-slate-400">
                        İlerleme: %
                        {Math.round(
                          (currentQuestion / (moduleData.questions?.length ?? 1)) *
                            100,
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentQuestion / (moduleData.questions?.length ?? 1)) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                  </div>

                  <div className="mb-8">
                    <p className="text-xl text-white font-medium leading-relaxed">
                      {moduleData.questions[currentQuestion].q}
                    </p>
                  </div>

                  {moduleData.questions[currentQuestion].optionType ===
                    "molecule" && (
                    <div className="mb-6 flex flex-wrap gap-4 justify-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                      <div className="text-sm font-medium text-slate-400 w-full text-center mb-1">
                        Atom Renkleri:
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#ffffff] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]"></div>
                        <span className="text-sm text-slate-300">Hidrojen (H)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#222222] border border-slate-700 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]"></div>
                        <span className="text-sm text-slate-300">Karbon (C)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#ff0000] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]"></div>
                        <span className="text-sm text-slate-300">Oksijen (O)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#0000ff] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]"></div>
                        <span className="text-sm text-slate-300">Azot (N)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#00ff00] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]"></div>
                        <span className="text-sm text-slate-300">Klor (Cl)</span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`grid gap-4 mb-8 ${moduleData.questions[currentQuestion].optionType === "molecule" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
                  >
                    {moduleData.questions[currentQuestion].optionType === "molecule"
                      ? moduleData.questions[currentQuestion].moleculeOptions?.map(
                          (optMolecule, idx) => {
                            let btnClass =
                              "w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ";

                            if (!showResult) {
                              btnClass +=
                                "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-200";
                            } else {
                              if (
                                idx ===
                                moduleData.questions![currentQuestion].answer
                              ) {
                                btnClass +=
                                  "border-emerald-500 bg-emerald-500/20 text-emerald-400 font-medium";
                              } else if (idx === selectedAnswer) {
                                btnClass +=
                                  "border-red-500 bg-red-500/20 text-red-400";
                              } else {
                                btnClass +=
                                  "border-slate-800 bg-slate-900/50 text-slate-500 opacity-50";
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={showResult}
                                className={btnClass}
                              >
                                <div className="h-48 w-full relative">
                                  <MoleculeViewer
                                    model={optMolecule}
                                    disableInteraction={true}
                                    hideLabels={true}
                                    className="absolute inset-0 w-full h-full"
                                  />
                                </div>
                                {showResult &&
                                  idx ===
                                    moduleData.questions![currentQuestion]
                                      .answer && (
                                    <div className="absolute top-4 right-4 bg-emerald-500 rounded-full p-1 text-white">
                                      <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                  )}
                              </button>
                            );
                          },
                        )
                      : moduleData.questions[currentQuestion].options?.map(
                          (opt, idx) => {
                            let btnClass =
                              "w-full text-left p-4 rounded-xl border transition-all ";

                            if (!showResult) {
                              btnClass +=
                                "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-200";
                            } else {
                              if (
                                idx ===
                                moduleData.questions![currentQuestion].answer
                              ) {
                                btnClass +=
                                  "border-emerald-500 bg-emerald-500/20 text-emerald-400 font-medium";
                              } else if (idx === selectedAnswer) {
                                btnClass +=
                                  "border-red-500 bg-red-500/20 text-red-400";
                              } else {
                                btnClass +=
                                  "border-slate-800 bg-slate-900/50 text-slate-500 opacity-50";
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={showResult}
                                className={btnClass}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{opt}</span>
                                  {showResult &&
                                    idx ===
                                      moduleData.questions![currentQuestion]
                                        .answer && (
                                      <CheckCircle2 className="w-5 h-5" />
                                    )}
                                </div>
                              </button>
                            );
                          },
                        )}
                  </div>

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between items-center pt-6 border-t border-white/10"
                    >
                      <div
                        className={`font-medium ${isCorrect ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {isCorrect
                          ? "Tebrikler, doğru cevap!"
                          : "Maalesef yanlış cevap."}
                      </div>
                      <button
                        onClick={nextQuestion}
                        className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
                      >
                        {currentQuestion < (moduleData.questions?.length ?? 1) - 1
                          ? "Sonraki Soru"
                          : "Testi Bitir"}
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

            {}
            {moduleData.type === "quiz" && quizFinished && (
               <TrophySummary 
                  title="Test Tamamlandı!" 
                  score={Math.round((correctAnswers / (moduleData.questions?.length ?? 1)) * 1000)}
                  onComplete={handleComplete}
                  isCompleted={completed}
                />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TrophySummary({ 
  title, 
  score, 
  onComplete, 
  isCompleted 
}: { 
  title: string, 
  score?: number, 
  onComplete: () => void, 
  isCompleted: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      {score !== undefined && (
        <p className="text-slate-400 mb-8">Skorun: {score} Puan</p>
      )}

      <div className="mb-8 text-left">
        <Leaderboard />
      </div>

      <button
        onClick={onComplete}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] inline-flex items-center gap-2"
      >
        {isCompleted ? "Haritaya Dön" : "Devam Et"}
        <ArrowLeft className="w-5 h-5 rotate-180" />
      </button>
    </motion.div>
  );
}
