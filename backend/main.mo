import Int "mo:base/Int";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  // Define a type for translation entries
  type TranslationEntry = {
    id: Nat;
    originalText: Text;
    translatedText: Text;
    targetLanguage: Text;
    timestamp: Int;
  };

  // Store translation history
  stable var translations: [TranslationEntry] = [];
  stable var nextId: Nat = 0;

  // Add a new translation to the history
  public func addTranslation(originalText: Text, translatedText: Text, targetLanguage: Text) : async Nat {
    let entry: TranslationEntry = {
      id = nextId;
      originalText = originalText;
      translatedText = translatedText;
      targetLanguage = targetLanguage;
      timestamp = Time.now();
    };
    translations := Array.append(translations, [entry]);
    nextId += 1;
    nextId - 1
  };

  // Get all translations
  public query func getTranslations() : async [TranslationEntry] {
    translations
  };
}
