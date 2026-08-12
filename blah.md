### Features

The Modern Kawi Transcriber is designed to be as flexible as possible, addressing the phonological and orthographic needs not only of Western Malayo-Polynesian languages, but also of virtually any Austronesian language. It includes several under-the-hood features to ensure accurate renderings, such as:

* Normalization: the engine automatically removes standard combining accent marks (such as á, î, ù, ë) while correctly interpreting their underlying vowel values.
* Tagalog abbreviations: commonly abbreviated Tagalog particles such as _ng_ and _mga_ are automatically expanded to _nang_ and _manga_, respectively, before transcription.
* Sample texts: a dedicated button cycles through thirteen preloaded translations of the Universal Declaration of Human Rights in various Austronesian languages (plus Sanskrit) to demonstrate the script's flexibility.

### Configuration toggles

The user interface features a set of buttons that allow users to customize the orthographic style of the output. Clicking these buttons cycles through their respective modes in real-time.

| Feature Toggle | Description | Modes |
|---|---|---|
| **Unaccented E** | Controls how ⟨e⟩ is rendered. | **⟨e⟩ → /ə/** (uses the traditional Pepet mark) or **⟨e⟩ → /e/** (maps ⟨e⟩ to the Taling mark, just like ⟨é⟩). |
| **Coda R** | Adjusts the position of the Repha mark (𑼂). | **Pre-consonantal** (the Repha is attached to the *next* syllable block) or **post-vowel** (the Repha attaches directly to the *preceding* syllable). |
| Independent vowels | Determines how standalone or initial vowels are drawn. | Classic: Uses unique, standalone Kawi vowel characters (e.g., 𑼄). 
||Carrier: Uses the 'ha' character (𑼲) acting as a silent vowel carrier with dependent vowel signs attached. |
| Diphthong Mode | Sets the behavior for vowel sequences like 'ai' and 'au'. | Diphthong: Merges them into a single syllable using specific diphthong markers (e.g., 𑼿). 
||Hiatus: Splits them into two distinct syllables using independent vowels. |
| Vowel Length | Controls how double vowels (e.g., 'aa', 'ii') are interpreted. | Long: Renders them as a single long vowel (e.g., 𑼴). 
||Hiatus: Renders them as two separate short vowels. |
| DH/TH Assignment | Dictates the mapping for the 'dh' and 'th' digraphs. | Literal: Treats them as separate, stacked consonants (d/t + h). 
 Aspirate: Maps to classical Sanskrit voiced/voiceless aspirates (𑼤 / 𑼢). 
 Retroflex: Maps to Javanese retroflex consonants (𑼞 / 𑼜). |
| Spacing Mode | Modifies how word boundaries are handled. | Spaces: Retains standard spaces between words. 
 Continua: Removes all spaces, mimicking traditional continuous manuscript writing (scriptio continua). 
 Fused: Replaces spaces with zero-width characters, allowing consonant stacking to bridge across separate words. |

### Special input syntax

To give users absolute control over edge cases, the engine supports a few manual override tags in the input text:

* Stack breaker: inserting an apostrophe between two consonants (e.g., n'j) forces the engine to break a consonant stack, using a visible Pangkon (𑽁) instead of subjoining the next character.
* Raw text pass-through: any text wrapped in angle brackets \<like this\> will completely bypass the transcription engine and be printed exactly as-is in the output.
