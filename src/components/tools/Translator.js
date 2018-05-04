import { IntlProvider } from 'react-intl';
import Strings from "../../strings.json";

const Translator = (id, lang) => {

    const {intl} = new IntlProvider({locale: lang, messages: Strings[lang]}, {}).getChildContext();
    let string = "";

    if(intl.messages[id] !== '') {
        string = intl.formatMessage({ id });
    }

    return string;

};

export default Translator;