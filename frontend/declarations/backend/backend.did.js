export const idlFactory = ({ IDL }) => {
  const TranslationEntry = IDL.Record({
    'id' : IDL.Nat,
    'originalText' : IDL.Text,
    'targetLanguage' : IDL.Text,
    'translatedText' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addTranslation' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getTranslations' : IDL.Func([], [IDL.Vec(TranslationEntry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
