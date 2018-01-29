import languages from '../languages';

import profile from './profile';
import contact from './contact';
import skills from './skills';
import samples from './samples';

export default {
    profile: profile,
    contact: contact,
    skills: skills,
    samples: samples,
    currentLanguage: languages.find((lng) => lng.id === 'nl')
}