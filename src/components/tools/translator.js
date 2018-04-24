import { IntlProvider } from 'react-intl';
import Strings from "../../strings.json";

const Translator = (id, lang) => {
    const {intl} = new IntlProvider({locale: lang, messages: Strings[lang]}, {}).getChildContext();
    return intl.formatMessage({ id });
};

export default Translator;