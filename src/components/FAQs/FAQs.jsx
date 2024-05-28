import SectionInfo from '../SectionInfo/SectionInfo';
import faq from '../../assets/faq.png';
import faqData from './faq-data.json';
import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';

const FAQs = () => {
const {theme} = useContext(ThemeContext);
    return (
        <section className='my-8 md:my-16'>
            <SectionInfo
                heading={"Frequently Asked Questions"}
                info={"Here are some common questions and answers to help you better understand our site."}
            />
            <div className="flex flex-col items-center mb-4">
                <img className='w-4/5 md:w-[480px]' src={faq} alt="FAQs" />
            </div>
            <div className="space-y-1 text-furry">
                {faqData.map((faq, index) => (
                    <details
                        key={index}
                        className="w-full border shadow-sm shadow-[#8689ee]"
                    >
                        <summary className="px-4 py-6 focus:outline-none cursor-pointer text-lg md:text-xl font-semibold">
                            {faq.question}
                        </summary>
                        <p className={`px-4 py-6 pt-0 ml-4 -mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
};

export default FAQs;
