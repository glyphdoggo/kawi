### Features

The Modern Kawi Transcriber is designed to handle the specific phonological and orthographic needs of various Austronesian languages, more specifically Western Malayo-Polynesian ones. It includes several under-the-hood features to ensure accurate renderings:

* Normalization: the engine automatically strips standard combining accent marks (like á, ì, ê, ö) while interpreting them correctly for their underlying vowel values.
* Tagalog abbreviations: commonly abbreviated Tagalog particles like "ng" and "mga" are automatically expanded to "nang" and "manga" before transcription.
* Sample text generator: a dedicated "sample text" button cycles through 13 pre-loaded translations of the Universal Declaration of Human Rights in various Austronesian languages (plus Sanskrit), to demonstrate the script's flexibility.

### Configuration toggles

The user interface features a set of buttons that allow users to customize the orthographic style of the output. Clicking these buttons cycles through their respective modes in real-time.
| Feature Toggle | Description | Modes |
|---|---|---|
| Pepet (Unaccented 'e') | Controls how the schwa/pepet sound is rendered. | Classic: Uses the traditional Pepet mark (𑽀). 
 Phonetic: Uses the Taling mark (𑼾) commonly used for standard 'e'. |
| Repha (r-coda) | Adjusts the position of the Repha mark (𑼂) for syllable-final 'r'. | Pre-consonant: The Repha precedes the next stacked consonant. 
 Post-vowel: The Repha attaches directly to the preceding syllable. |
| Independent Vowel | Determines how standalone or initial vowels are drawn. | Classic: Uses unique, standalone Kawi vowel characters (e.g., 𑼄). 
 Carrier: Uses the 'ha' character (𑼲) acting as a silent vowel carrier with dependent vowel signs attached. |
| Diphthong Mode | Sets the behavior for vowel sequences like 'ai' and 'au'. | Diphthong: Merges them into a single syllable using specific diphthong markers (e.g., 𑼿). 
 Hiatus: Splits them into two distinct syllables using independent vowels. |
| Vowel Length | Controls how double vowels (e.g., 'aa', 'ii') are interpreted. | Long: Renders them as a single long vowel (e.g., 𑼴). 
 Hiatus: Renders them as two separate short vowels. |
| DH/TH Assignment | Dictates the mapping for the 'dh' and 'th' digraphs. | Literal: Treats them as separate, stacked consonants (d/t + h). 
 Aspirate: Maps to classical Sanskrit voiced/voiceless aspirates (𑼤 / 𑼢). 
 Retroflex: Maps to Javanese retroflex consonants (𑼞 / 𑼜). |
| Spacing Mode | Modifies how word boundaries are handled. | Spaces: Retains standard spaces between words. 
 Continua: Removes all spaces, mimicking traditional continuous manuscript writing (scriptio continua). 
 Fused: Replaces spaces with zero-width characters, allowing consonant stacking to bridge across separate words. |

### Special input syntax

To give users absolute control over edge cases, the engine supports a few manual override tags in the input text:

* Apostrophe Stack-Breaker ('): Inserting an apostrophe between two consonants (e.g., n'j) forces the engine to break a consonant stack, using a visible Pangkon (𑽁) instead of subjoining the next character.
* Raw text pass-through: any text wrapped in angle brackets \<like this\> will completely bypass the transcription engine and be printed exactly as-is in the output.
