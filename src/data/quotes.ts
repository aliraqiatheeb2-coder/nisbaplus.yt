// Daily philosophical quotes in Arabic and English that change at 00:00 GMT
export interface Quote {
  text: string;
  author: string;
  language: 'ar' | 'en';
}

export const philosophicalQuotes: Quote[] = [
  // Arabic Quotes - Classical Philosophers
  { text: "المعرفة قوة", author: "فرانسيس بيكون", language: 'ar' },
  { text: "الحياة غير المفحوصة لا تستحق العيش", author: "سقراط", language: 'ar' },
  { text: "نحن ما نفعله بانتظام. التميز إذن ليس فعلاً بل عادة", author: "أرسطو", language: 'ar' },
  { text: "الطريق الوحيد للقيام بعمل عظيم هو أن تحب ما تفعله", author: "ستيف جوبز", language: 'ar' },
  { text: "في وسط الصعوبة تكمن الفرصة", author: "ألبرت أينشتاين", language: 'ar' },
  { text: "الإنسان محكوم عليه أن يكون حراً", author: "جان بول سارتر", language: 'ar' },
  { text: "أعرف أنني لا أعرف شيئاً", author: "سقراط", language: 'ar' },
  { text: "الصداقة الحقيقية نبتة بطيئة النمو", author: "جورج واشنطن", language: 'ar' },
  { text: "السعادة ليست هدفاً... إنها نتيجة ثانوية لحياة عاشها الإنسان جيداً", author: "إليانور روزفلت", language: 'ar' },
  { text: "كن أنت التغيير الذي تريد أن تراه في العالم", author: "المهتما غاندي", language: 'ar' },
  
  // English Quotes - Classical Philosophers  
  { text: "Knowledge is power", author: "Francis Bacon", language: 'en' },
  { text: "The unexamined life is not worth living", author: "Socrates", language: 'en' },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit", author: "Aristotle", language: 'en' },
  { text: "The only way to do great work is to love what you do", author: "Steve Jobs", language: 'en' },
  { text: "In the middle of difficulty lies opportunity", author: "Albert Einstein", language: 'en' },
  { text: "Man is condemned to be free", author: "Jean-Paul Sartre", language: 'en' },
  { text: "I know that I know nothing", author: "Socrates", language: 'en' },
  { text: "True friendship is a plant of slow growth", author: "George Washington", language: 'en' },
  { text: "Happiness is not a goal... it's a by-product of a life well-lived", author: "Eleanor Roosevelt", language: 'en' },
  { text: "Be the change you wish to see in the world", author: "Mahatma Gandhi", language: 'en' },
  
  // More Arabic Quotes
  { text: "الحكمة تبدأ بالدهشة", author: "أرسطو", language: 'ar' },
  { text: "الصبر مفتاح الفرج", author: "الإمام علي", language: 'ar' },
  { text: "العلم نور والجهل ظلام", author: "الخوارزمي", language: 'ar' },
  { text: "من جد وجد ومن زرع حصد", author: "مثل عربي", language: 'ar' },
  { text: "الوقت من ذهب إذا لم تدركه ذهب", author: "ابن سينا", language: 'ar' },
  { text: "العقل السليم في الجسم السليم", author: "جوفينال", language: 'ar' },
  { text: "اطلبوا العلم من المهد إلى اللحد", author: "النبي محمد", language: 'ar' },
  { text: "الصديق وقت الضيق", author: "مثل عربي", language: 'ar' },
  { text: "درهم وقاية خير من قنطار علاج", author: "بنجامين فرانكلين", language: 'ar' },
  { text: "النجاح هو القدرة على الانتقال من فشل إلى فشل دون فقدان الحماس", author: "ونستون تشرشل", language: 'ar' },
  
  // More English Quotes
  { text: "Wisdom begins in wonder", author: "Aristotle", language: 'en' },
  { text: "Patience is the key to relief", author: "Imam Ali", language: 'en' },
  { text: "Knowledge is light and ignorance is darkness", author: "Al-Khwarizmi", language: 'en' },
  { text: "He who seeks finds, and he who sows reaps", author: "Arabic Proverb", language: 'en' },
  { text: "Time is gold, if you don't realize it, it's gone", author: "Ibn Sina", language: 'en' },
  { text: "A sound mind in a sound body", author: "Juvenal", language: 'en' },
  { text: "Seek knowledge from the cradle to the grave", author: "Prophet Muhammad", language: 'en' },
  { text: "A friend in need is a friend indeed", author: "Arabic Proverb", language: 'en' },
  { text: "Prevention is better than cure", author: "Benjamin Franklin", language: 'en' },
  { text: "Success is the ability to go from failure to failure without losing enthusiasm", author: "Winston Churchill", language: 'en' },
  
  // Extended Collection - Philosophy of Life
  { text: "الحياة رحلة وليست وجهة", author: "رالف والدو إمرسون", language: 'ar' },
  { text: "من لا يخطط للمستقبل سيجد صعوبة في تحقيقه", author: "كونفوشيوس", language: 'ar' },
  { text: "الشجاعة ليست عدم الخوف، بل مواجهة الخوف", author: "نيلسون مانديلا", language: 'ar' },
  { text: "العظمة ليست في عدم السقوط، بل في النهوض كلما سقطنا", author: "كونفوشيوس", language: 'ar' },
  { text: "الأمل شيء له ريش يجثم في الروح", author: "إيميلي ديكنسون", language: 'ar' },
  { text: "Life is a journey, not a destination", author: "Ralph Waldo Emerson", language: 'en' },
  { text: "He who fails to plan, plans to fail", author: "Confucius", language: 'en' },
  { text: "Courage is not the absence of fear, but facing fear", author: "Nelson Mandela", language: 'en' },
  { text: "Greatness is not in never falling, but in rising every time we fall", author: "Confucius", language: 'en' },
  { text: "Hope is the thing with feathers that perches in the soul", author: "Emily Dickinson", language: 'en' },
  
  // Wisdom & Learning
  { text: "التعلم لا يتوقف حتى الموت", author: "ابن رشد", language: 'ar' },
  { text: "الحكيم من يتعلم من أخطاء الآخرين", author: "أوتو فون بسمارك", language: 'ar' },
  { text: "المعرفة التي لا تطبق كشجرة لا تثمر", author: "ابن خلدون", language: 'ar' },
  { text: "العلم بلا عمل كسفينة بلا شراع", author: "أفلاطون", language: 'ar' },
  { text: "من علمني حرفاً كنت له عبداً", author: "الإمام علي", language: 'ar' },
  { text: "Learning never stops until death", author: "Ibn Rushd", language: 'en' },
  { text: "The wise learn from others' mistakes", author: "Otto von Bismarck", language: 'en' },
  { text: "Knowledge not applied is like a tree that bears no fruit", author: "Ibn Khaldun", language: 'en' },
  { text: "Knowledge without action is like a ship without sails", author: "Plato", language: 'en' },
  { text: "Whoever teaches me a letter, I become their servant", author: "Imam Ali", language: 'en' },
  
  // Success & Perseverance
  { text: "النجاح هو المشي من فشل إلى فشل دون فقدان الحماس", author: "ونستون تشرشل", language: 'ar' },
  { text: "الطموح سلم لا يمكن تسلقه ويداك في جيبك", author: "أمريكي مجهول", language: 'ar' },
  { text: "الفشل ليس السقوط بل الرفض في النهوض", author: "نابليون هيل", language: 'ar' },
  { text: "المثابرة هي العمل الشاق الذي تقوم به بعد أن تتعب من العمل الشاق الذي قمت به", author: "نيوت جينجريتش", language: 'ar' },
  { text: "الطريق إلى النجاح والطريق إلى الفشل متشابهان تقريباً", author: "كولين ديفيس", language: 'ar' },
  { text: "Success is walking from failure to failure with no loss of enthusiasm", author: "Winston Churchill", language: 'en' },
  { text: "Ambition is a ladder that cannot be climbed with your hands in your pockets", author: "Unknown American", language: 'en' },
  { text: "Failure is not falling down but refusing to get up", author: "Napoleon Hill", language: 'en' },
  { text: "Perseverance is the hard work you do after you're tired of the hard work you already did", author: "Newt Gingrich", language: 'en' },
  { text: "The road to success and the road to failure are almost exactly the same", author: "Colin Davis", language: 'en' },
  
  // Character & Virtue
  { text: "الصدق منجاة والكذب مهلكة", author: "النبي محمد", language: 'ar' },
  { text: "الصبر عند الصدمة الأولى", author: "عمر بن الخطاب", language: 'ar' },
  { text: "التواضع يرفع الإنسان والكبر يخفضه", author: "لاو تزو", language: 'ar' },
  { text: "الكرم أن تعطي قبل أن تُسأل", author: "جبران خليل جبران", language: 'ar' },
  { text: "العدل أساس الملك", author: "عمر بن عبد العزيز", language: 'ar' },
  { text: "Honesty is salvation and lying is destruction", author: "Prophet Muhammad", language: 'en' },
  { text: "Patience at the first shock", author: "Umar ibn al-Khattab", language: 'en' },
  { text: "Humility elevates man and pride lowers him", author: "Lao Tzu", language: 'en' },
  { text: "Generosity is giving before being asked", author: "Khalil Gibran", language: 'en' },
  { text: "Justice is the foundation of sovereignty", author: "Umar ibn Abd al-Aziz", language: 'en' },
  
  // Time & Life Management
  { text: "الوقت كالسيف إن لم تقطعه قطعك", author: "مثل عربي", language: 'ar' },
  { text: "اليوم الذي لا نتعلم فيه شيئاً هو يوم ضائع", author: "ليوناردو دا فينشي", language: 'ar' },
  { text: "الحاضر هدية لذلك يسمى الحاضر", author: "إليانور روزفلت", language: 'ar' },
  { text: "أمس تاريخ، غداً لغز، اليوم هدية", author: "بيل كين", language: 'ar' },
  { text: "الوقت أثمن ما نملك لأنه أقل ما نملك", author: "جيم رون", language: 'ar' },
  { text: "Time is like a sword, if you don't cut it, it cuts you", author: "Arabic Proverb", language: 'en' },
  { text: "A day we don't learn something is a wasted day", author: "Leonardo da Vinci", language: 'en' },
  { text: "The present is a gift, that's why it's called the present", author: "Eleanor Roosevelt", language: 'en' },
  { text: "Yesterday is history, tomorrow is mystery, today is a gift", author: "Bill Keane", language: 'en' },
  { text: "Time is more valuable than anything we own because it's the least we own", author: "Jim Rohn", language: 'en' },
  
  // Happiness & Inner Peace
  { text: "السعادة ليست محطة نصل إليها بل طريقة في السفر", author: "مارجريت لي رونبيك", language: 'ar' },
  { text: "السلام الداخلي يبدأ باللحظة التي تختار فيها عدم السماح لشخص آخر أو حدث بالتحكم في مشاعرك", author: "بيما تشودرون", language: 'ar' },
  { text: "الفرح في النظر والشعور وليس في الامتلاك", author: "أنطوان دو سانت إكزوبيري", language: 'ar' },
  { text: "أسعد الناس ليس من يملك الأفضل، بل من يجعل الأفضل مما يملك", author: "مجهول", language: 'ar' },
  { text: "السعادة عادة. مارسها يومياً", author: "جون ماكسويل", language: 'ar' },
  { text: "Happiness is not a station we reach but a way of traveling", author: "Margaret Lee Runbeck", language: 'en' },
  { text: "Inner peace begins the moment you choose not to allow another person or event to control your emotions", author: "Pema Chödrön", language: 'en' },
  { text: "Joy is in looking and feeling, not in possessing", author: "Antoine de Saint-Exupéry", language: 'en' },
  { text: "The happiest people don't have the best, but make the best of what they have", author: "Unknown", language: 'en' },
  { text: "Happiness is a habit. Practice it daily", author: "John Maxwell", language: 'en' },
  
  // Dreams & Goals
  { text: "كل الأحلام يمكن أن تتحقق إذا كان لدينا الشجاعة لمتابعتها", author: "والت ديزني", language: 'ar' },
  { text: "الهدف بدون خطة مجرد أمنية", author: "أنطوان دو سانت إكزوبيري", language: 'ar' },
  { text: "الأحلام لا تأتي حقيقية بالسحر؛ إنه يحتاج إلى عرق وعزيمة وعمل شاق", author: "كولين باول", language: 'ar' },
  { text: "المستقبل ينتمي لأولئك الذين يؤمنون بجمال أحلامهم", author: "إليانور روزفلت", language: 'ar' },
  { text: "إذا كنت تستطيع أن تحلم به، تستطيع أن تفعله", author: "والت ديزني", language: 'ar' },
  { text: "All dreams can come true if we have the courage to pursue them", author: "Walt Disney", language: 'en' },
  { text: "A goal without a plan is just a wish", author: "Antoine de Saint-Exupéry", language: 'en' },
  { text: "Dreams don't come true through magic; it takes sweat, determination and hard work", author: "Colin Powell", language: 'en' },
  { text: "The future belongs to those who believe in the beauty of their dreams", author: "Eleanor Roosevelt", language: 'en' },
  { text: "If you can dream it, you can do it", author: "Walt Disney", language: 'en' },
  
  // Leadership & Influence
  { text: "القائد الحقيقي لا يخلق أتباعاً، بل يخلق قادة آخرين", author: "توم بيترز", language: 'ar' },
  { text: "المثال ليس الطريقة الرئيسية للتأثير على الآخرين، إنه الطريقة الوحيدة", author: "ألبرت شفايتزر", language: 'ar' },
  { text: "القوة الحقيقية لا تكمن في القدرة على تدمير، بل في القدرة على بناء", author: "نيلسون مانديلا", language: 'ar' },
  { text: "كن التغيير الذي تود رؤيته في العالم", author: "المهاتما غاندي", language: 'ar' },
  { text: "القائد يعرف الطريق، يسير في الطريق، ويظهر الطريق", author: "جون ماكسويل", language: 'ar' },
  { text: "A true leader doesn't create followers, but creates other leaders", author: "Tom Peters", language: 'en' },
  { text: "Example is not the main way to influence others, it's the only way", author: "Albert Schweitzer", language: 'en' },
  { text: "True power lies not in the ability to destroy, but in the ability to build", author: "Nelson Mandela", language: 'en' },
  { text: "Be the change you wish to see in the world", author: "Mahatma Gandhi", language: 'en' },
  { text: "A leader knows the way, goes the way, and shows the way", author: "John Maxwell", language: 'en' }
];

// Get daily quote based on current date at 00:00 GMT
export function getDailyQuote(language: 'ar' | 'en'): Quote {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Filter quotes by language
  const quotesInLanguage = philosophicalQuotes.filter(q => q.language === language);
  
  // Use day of year to select consistent daily quote
  const quoteIndex = dayOfYear % quotesInLanguage.length;
  
  return quotesInLanguage[quoteIndex];
}