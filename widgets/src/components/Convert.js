import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';
const URL = 'https://translation.googleapis.com/language/translate/v2';

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');

    useEffect(() => {
        const doTranslation = async () => {
            const { data } = await axios.post(
                URL,
                {},
                {
                    params: {
                        q: text,
                        target: language.value,
                        key: KEY,
                    },
                }
            );
            setTranslated(data.data.translations[0].translatedText);
        };

        if (text === '') {
            setTranslated('');
            return;
        }

        const timeOutId = setTimeout(() => {
            doTranslation();
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [language, text]);

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};

export default Convert;
