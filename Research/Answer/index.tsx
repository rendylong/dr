import React, { useState, useEffect, useRef } from 'react';
import { useAnswerStore } from '../../store/useAnswerStore';
import ReactMarkdown from 'react-markdown';
import SectionLayout from '../../pages/MyGBase/components/SectionLayout';



const Typewriter = ({ delay = 1, infinite = false }) => {
    const { answerText } = useAnswerStore();
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (currentIndex < answerText.length) {
            timeoutRef.current = window.setTimeout(() => {
                setCurrentText((prevText) => prevText + answerText[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);
        } else if (infinite) {
            setCurrentIndex(0);
            setCurrentText('');
        }

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, delay, infinite, answerText]);

    return (
        <>
            {currentText ? <ReactMarkdown>{currentText}</ReactMarkdown> :
                <SectionLayout>
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </SectionLayout>
            }
        </>
    );
};

export default Typewriter;