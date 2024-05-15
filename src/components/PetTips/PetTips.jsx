import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import summer from '../../assets/tips/summer.jpeg';
import winter from '../../assets/tips/winter.jpeg';
import holiday from '../../assets/tips/holiday.jpeg';
import health from '../../assets/tips/health.jpeg';
import behave from '../../assets/tips/behave.jpeg';
import nutrition from '../../assets/tips/nutrition.jpeg';

const PetTips = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <section className="my-8 md:my-20">
            <h3 className="text-center text-furry font-bold max-[430px]:text-xl text-2xl md:text-4xl mb-4">Pet Tips & Advice</h3>
            <p className="text-center mx-auto w-4/5 md:w-3/5 font-semibold mb-6 max-[430px]:text-sm md:text-lg">In the pursuit of providing the best care for your beloved furry friends, understanding their health, behavior, and nutritional needs is paramount. Here at &ldquo;Furry Friends,&rdquo; we&rsquo;ve curated a comprehensive guide to help you navigate through these crucial aspects of pet ownership</p>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <div className="font-kreonSerif text-sm md:text-2xl text-furry flex justify-center">
                    <TabList>
                        <Tab>Health Tips</Tab>
                        <Tab>Behavior Tips</Tab>
                        <Tab>Nutrition</Tab>
                        <Tab>Summer Care</Tab>
                        <Tab>Winter Care</Tab>
                        <Tab>Holiday Safety</Tab>
                    </TabList>
                </div>
                {/* Health */}
                <TabPanel>
                    <p className="text-gray-600 w-4/5 my-4 ml-2 text-sm md:text-lg">
                        Maintaining your pet&rsquo;s health is vital for their overall well-being. From daily exercise routines to preventative care measures, here&rsquo;s how you can ensure your pet stays in top shape:
                    </p>
                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-6">
                        <figure className="w-full lg:w-1/2 flex justify-end">
                            <img className='p-2 border' src={health} alt="Health Tips" />
                        </figure>
                        <ul className='w-4/5 lg:w-1/2 ml-10 flex flex-col gap-6 md:text-xl'>
                            <li className='list-disc'>Daily Exercise Routines: Tailor exercise regimens to suit the needs of dogs, cats, and small pets, promoting physical fitness and mental stimulation.</li>
                            <li className='list-disc'>Preventative Care: Learn essential tips on vaccinations, flea and tick prevention, as well as dental care practices to safeguard your pet&rsquo;s health.</li>
                            <li className='list-disc'>Dietary Guidelines: Discover balanced diet plans tailored to the specific needs of different pet species and breeds, ensuring optimal nutrition.
                            </li>
                            <li className='list-disc'>Grooming Basics: Master step-by-step grooming techniques such as brushing, bathing, and nail trimming to keep your pet looking and feeling their best.
                            </li>
                        </ul>
                    </div>
                </TabPanel>
                    {/* Behavior */}
                <TabPanel>
                    <p className="text-gray-600 w-4/5 my-4 ml-2 text-sm md:text-lg">
                        Understanding and addressing your pet&rsquo;s behavior is key to fostering a harmonious relationship. Explore effective training techniques and strategies to tackle common behavioral issues:

                    </p>
                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-6">
                        <figure className="w-full lg:w-1/2 flex justify-end">
                            <img src={behave} alt="Behavior Tips" />
                        </figure>
                        <ul className='w-4/5 lg:w-1/2 ml-10 flex flex-col gap-6 md:text-xl'>
                            <li className='list-disc'>Training Techniques: From basic commands to house and leash training, equip yourself with the knowledge to instill good behavior habits in your pet.
                            </li>
                            <li className='list-disc'>Behavioral Issues: Learn how to manage and overcome common problems like barking, scratching, and aggression, promoting a peaceful coexistence.</li>
                            <li className='list-disc'>Socialization: Discover invaluable tips for socializing your pet with other animals and people, nurturing positive interactions.</li>
                        </ul>
                    </div>
                </TabPanel>
                {/* Nutrition */}
                <TabPanel>
                    <p className="text-gray-600 w-4/5 my-4 ml-2 text-sm md:text-lg">
                        Proper nutrition is the cornerstone of a healthy lifestyle for your pet. Delve into expert advice on feeding practices and dietary management:
                    </p>
                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-6">
                        <figure className="w-full lg:w-1/2 flex justify-end">
                            <img src={nutrition} alt="Nutrition" />
                        </figure>
                        <ul className='w-4/5 lg:w-1/2 ml-10 flex flex-col gap-6 md:text-xl'>
                            <li className='list-disc'>Healthy Treat Recipes: Whip up simple yet nutritious homemade treats to indulge your pet while promoting their health.</li>
                            <li className='list-disc'>Feeding Schedules: Establish appropriate feeding times and portions tailored to your pet&rsquo;s age, size, and dietary requirements.</li>
                            <li className='list-disc'>Special Diets: Gain insights into managing allergies, weight issues, and other dietary needs specific to your pet, ensuring their nutritional needs are met.</li>
                        </ul>
                    </div>
                </TabPanel>
                {/* Summer Care */}
                <TabPanel>
                    <p className="text-gray-600 w-4/5 my-4 ml-2 text-sm md:text-lg">
                        With the sun shining bright and temperatures soaring, here&rsquo;s how you can keep your pets cool and comfortable during the summer months:
                    </p>

                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-6">
                        <figure className="w-full lg:w-1/2 flex justify-end">
                            <img src={summer} alt="Summer Care" />
                        </figure>
                        <ul className='w-4/5 lg:w-1/2 ml-10 flex flex-col gap-6 md:text-xl'>
                            <li className='list-disc'>Keeping Pets Cool: Provide shade and ample fresh water to prevent overheating, and consider using cooling mats or vests for added relief.</li>
                            <li className='list-disc'>Hydration Tips: Ensure your pets stay hydrated by regularly refilling their water bowls and offering ice cubes as a refreshing treat.</li>
                            <li className='list-disc'>Heatstroke Prevention: Recognize the signs of heatstroke and take immediate steps to cool down your pet if necessary, such as applying cool water to their fur and seeking veterinary attention.</li>
                        </ul>
                    </div>
                </TabPanel>
                {/* Winter Care */}
                <TabPanel>
                    <p className="text-gray-600 w-4/5 my-4 ml-2 text-sm md:text-lg">
                        When the cold weather sets in, it&rsquo;s important to protect your pets from the chill and potential hazards of the season:
                    </p>

                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-6">
                        <figure className="w-full lg:w-1/2 flex justify-end">
                            <img src={winter} alt="Winter Care" />
                        </figure>
                        <ul className='w-4/5 lg:w-1/2 ml-10 flex flex-col gap-6 md:text-xl'>
                            <li className='list-disc'>Protecting Pets from the Cold: Provide warm bedding indoors and limit outdoor exposure during freezing temperatures, especially for short-haired or elderly pets.</li>
                            <li className='list-disc'>Dealing with Snow and Ice: Keep your pet&rsquo;s paws clean and free of snow and ice, and consider using pet-safe ice melt on walkways to prevent injury.</li>
                            <li className='list-disc'>Indoor Activities: Engage your pets with interactive toys and games to keep them mentally stimulated and active during the winter months.</li>
                        </ul>
                    </div>
                </TabPanel>
                { }
                <TabPanel>
                    <p className="text-gray-600 w-4/5 my-4 ml-2 text-sm md:text-lg">
                        As festivities abound, be mindful of the potential dangers that holidays can pose to your pets:
                    </p>
                    <div className="flex flex-col lg:flex-row-reverse justify-between gap-6">
                        <figure className="w-full lg:w-1/2 flex justify-end">
                            <img src={holiday} alt="Holiday Safety" />
                        </figure>
                        <ul className='w-4/5 lg:w-1/2 ml-10 flex flex-col gap-6 md:text-xl'>
                            <li className='list-disc'>Handling Fireworks: Keep pets indoors during fireworks displays to prevent stress and potential escape, and create a calm and safe environment with familiar toys and blankets.</li>
                            <li className='list-disc'>Keeping Pets Calm: Manage anxiety during celebrations with calming techniques, such as providing a quiet space away from the festivities and using pheromone diffusers or calming supplements.</li>
                            <li className='list-disc'>Holiday Hazards: Be cautious of holiday decorations, plants, and foods that can be toxic to pets, and keep them out of reach to avoid accidents.</li>
                        </ul>
                    </div>
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default PetTips;