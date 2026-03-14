import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, RefreshCcw, Image as ImageIcon } from 'lucide-react';

const questions = [
  { id: 'A', title: '图片A的征象为' },
  { id: 'B', title: '图片B的征象为' },
  { id: 'C', title: '图片C的征象为' },
  { id: 'D', title: '图片D的征象为' },
  { id: 'E', title: '图片E的征象为' },
  { id: 'F', title: '图片F的征象为' },
];

const options = ['黑洞征', '岛征', '斑点征', '正常'];

export default function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      return;
    }
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        {!isSubmitted && (
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1.5">医学影像征象识别测试</h1>
            <p className="text-sm text-slate-500">请仔细观察图片并选择正确的征象</p>
          </header>
        )}

        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {questions.map((q, index) => (
              <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                    {index + 1}
                  </span>
                  <h2 className="text-base font-medium text-slate-800">{q.title}</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  {/* 图片展示区域 (左侧) */}
                  <div className="w-full md:w-1/2 lg:w-3/5 relative bg-black rounded-xl overflow-hidden flex items-center justify-center min-h-[200px]">
                    <img 
                      src={`/${q.id}.png`} 
                      alt={`图片 ${q.id}`} 
                      className="w-full h-auto max-h-[280px] object-contain"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith('.png')) {
                          // 如果 png 加载失败，尝试加载 jpg
                          target.src = `/${q.id}.jpg`;
                        } else if (target.src.endsWith('.jpg')) {
                          // 如果 jpg 也加载失败，尝试加载 jpeg
                          target.src = `/${q.id}.jpeg`;
                        } else {
                          // 如果都失败了，显示占位提示
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                          target.nextElementSibling?.classList.add('flex');
                        }
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center absolute inset-0 bg-slate-100 border-2 border-dashed border-slate-300 text-center p-4">
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-600 font-medium mb-1">等待图片上传</span>
                    </div>
                  </div>
                  
                  {/* 选项区域 (右侧) */}
                  <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                      {options.map((option) => {
                        const isSelected = answers[q.id] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(q.id, option)}
                            className={`
                              relative flex items-center p-3 rounded-xl border-2 transition-all duration-200 text-left
                              ${isSelected 
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                              }
                            `}
                          >
                            <div className={`
                              flex items-center justify-center w-4 h-4 rounded-full border mr-3 flex-shrink-0
                              ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}
                            `}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="text-sm font-medium">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6 pb-12 flex flex-col items-center">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all active:scale-95
                  ${Object.keys(answers).length < questions.length 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                  }
                `}
              >
                确定提交答案
                <ChevronRight className="w-5 h-5" />
              </button>
              {Object.keys(answers).length < questions.length && (
                <p className="mt-3 text-sm text-slate-500">
                  已回答 {Object.keys(answers).length}/{questions.length} 题，请完成所有题目后提交
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-2xl mx-auto"
          >
            <div className="bg-indigo-600 py-3 px-6 text-center text-white flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold">提交成功</h2>
              </div>
              <p className="text-indigo-100 text-xs">以下是您的判断结果</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-2.5">
                {questions.map((q, index) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={q.id} 
                    className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-base text-slate-800">
                        图片{q.id}您的判断是：<span className="font-bold text-indigo-700 ml-1">{answers[q.id]}</span>
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full font-medium transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  重新测试
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
