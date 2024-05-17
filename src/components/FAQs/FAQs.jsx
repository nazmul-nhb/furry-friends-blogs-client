import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { MdOutlineExpandCircleDown } from 'react-icons/md';

const FAQs = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    }

    return (
        <section className='my-8 md:my-20'>
            <h3 className="text-center text-furry font-bold max-[430px]:text-2xl text-3xl md:text-4xl mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-600 text-center mx-auto w-4/5 md:w-3/5 font-semibold mb-6 max-[430px]:text-base md:text-lg">Here are some common questions and answers to help you better understand our site.</p>
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                    '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
            >
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h4>What is Furry Friends all about?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        Furry Friends is a pet-centric blog dedicated to providing valuable information, tips, and resources for pet owners. We cover everything from pet care and health to behavior, training, and lifestyle.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>Who writes the content on Furry Friends?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        Our content is crafted by a team of passionate pet enthusiasts and experts with years of experience in pet care, veterinary medicine, training, and behavior.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>Are the tips and advice on Furry Friends backed by professionals?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        Yes, we strive to ensure that all the information provided on our website is accurate and reliable. Our content is curated from trusted sources, and we consult with veterinary professionals and pet experts to ensure the highest quality of information.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>Can I submit content or share my pet stories on Furry Friends?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        We cater to all types of pets, including dogs, cats, small mammals (such as rabbits, hamsters, and guinea pigs), birds, reptiles, and exotic pets. Our goal is to provide valuable information for pet owners of all kinds.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>What type of pets do you cater to?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        Absolutely! We love hearing from our readers and welcome contributions from fellow pet lovers. Whether you have a heartwarming pet story to share, useful tips, or insights from your own pet ownership journey, we&rsquo;d love to feature it on our website.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>How can I stay updated on new content from Furry Friends?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        You can stay updated by subscribing to our newsletter, following us on social media platforms like Facebook, Instagram, and Twitter, or by regularly visiting our website for the latest articles and updates.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>Do you offer product recommendations or reviews?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        Yes, we provide unbiased product recommendations and reviews for pet-related products, including food, toys, accessories, and grooming supplies. Our goal is to help pet owners make informed decisions when choosing products for their furry friends.
                    </h4>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary className='!text-furry !text-xl md:!text-2xl !font-semibold'
                    expandIcon={<MdOutlineExpandCircleDown className='!text-furry !text-xl md:!text-2xl !font-bold' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4>Is the information on Furry Friends applicable globally?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <h4>
                        While we strive to provide general pet care information that applies to a wide audience, it&rsquo;s important to consider regional differences in pet care practices and regulations. We recommend consulting with local veterinarians or pet care professionals for specific advice tailored to your location.
                    </h4>
                </AccordionDetails>
            </Accordion>
        </section>
    );
};

export default FAQs;