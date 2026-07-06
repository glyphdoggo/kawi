const inputArea  = document.getElementById("input");
      const outputArea = document.getElementById("output");

      const codas = new Map([
        ['ng', '𑼁'],
        ['h', '𑼃'],
        ['m', '𑼀']
      ]);
      
      const CONFIGOPTIONS = {
        pepet: {
          states: ['classic', 'phonetic'],
          labels: ['e → 𑽀◌', 'e → 𑼾◌'],
          index: 0,
          element: document.getElementById("btn-opt-pepet")
        }
      };

      const independentVowels = new Map([
        ['a', '𑼄'], ['ā', '𑼅'], ['aa', '𑼅'], ['i', '𑼆'], ['ī', '𑼇'], ['ii', '𑼇'], ['eu', '𑼲𑽀'],
        ['u', '𑼈'], ['ū', '𑼉'], ['uu', '𑼉'], ['e', '𑼎'], ['è', '𑼎'], ['é', '𑼎'], ['ai', '𑼏'], ['o', '𑼐'], ['au', '𑼐𑼴']
      ]);

      const consonantMappings = new Map([
        ['ka', '𑼒'], ['kha', '𑼓'], ['ga', '𑼔'], ['gha', '𑼕'], ['ṅa', '𑼖'], ['ca', '𑼗'], 
        ['cha', '𑼘'], ['ja', '𑼙'], ['jha', '𑼚'], ['ña', '𑼛'], ['ṭa', '𑼜'], ['ṭha', '𑼝'], 
        ['ḍa', '𑼞'], ['ḍha', '𑼟'], ['ṇa', '𑼠'], ['ta', '𑼡'], ['tha', '𑼢'], ['da', '𑼣'], 
        ['dha', '𑼤'], ['na', '𑼥'], ['pa', '𑼦'], ['pha', '𑼧'], ['ba', '𑼨'], ['bha', '𑼩'], 
        ['ma', '𑼪'], ['ya', '𑼫'], ['ra', '𑼬'], ['la', '𑼭'], ['va', '𑼮'], ['śa', '𑼯'], 
        ['ṣa', '𑼰'], ['sa', '𑼱'], ['ha', '𑼲'], ['jña', '𑼳']
      ]);

      const standardConsonants = new Map([
        ['k', 'ka'], ['kh', 'kha'], ['g', 'ga'], ['gh', 'gha'], ['ṅ', 'ṅa'], ['ng', 'ṅa'], 
        ['ŋ', 'ṅa'], ['c', 'ca'], ['ch', 'cha'], ['j', 'ja'], ['jh', 'jha'], ['ñ', 'ña'], 
        ['ny', 'ña'], ['ṭ', 'ṭa'], ['ṭh', 'ṭha'], ['ḍ', 'ḍa'], ['ḍh', 'ḍha'], ['ṇ', 'ṇa'], 
        ['t', 'ta'], ['th', 'tha'], ['d', 'da'], ['dh', 'dha'], ['n', 'na'], ['p', 'pa'], 
        ['ph', 'pha'], ['b', 'ba'], ['bh', 'bha'], ['m', 'ma'], ['y', 'ya'], ['r', 'ra'], 
        ['l', 'la'], ['v', 'va'], ['w', 'va'], ['ś', 'śa'], ['sy', 'śa'], ['ṣ', 'ṣa'],
        ['s', 'sa'], ['h', 'ha'], ['jñ', 'jña'], ['jny', 'jña'], ['gy', 'jña'], ['f', 'pha']
      ]);

      const punctuationMap = new Map([
        ['\'', ''],
        // ['-', '𑽉'],
        ['-', ''],
        ['\t', '𑽅'],
        ['.', '𑽄'],
        ['\"', '𑽊'],
        [',', '𑽃'],
        ['(', '𑽃'],
        [')', '𑽃'],
        [':', '𑽋'],
        [';', '𑽋'],
      ]);

      let vowelMappings = new Map();

      function updateMappings() {
        vowelMappings.clear();
        const optPepet = CONFIGOPTIONS.pepet.states[CONFIGOPTIONS.pepet.index];

        const vowelGroups = [
          { keys: ['a', 'á', 'à', 'â', 'å'], val: '' },
          { keys: ['ā', 'aa'], val: '𑼴' },
          { keys: ['i', 'í', 'ì', 'î', 'ï'], val: '𑼶' },
          { keys: ['ī', 'ii'], val: '𑼷' },
          { keys: ['u', 'ú', 'ù', 'û', 'ü'], val: '𑼸' },
          { keys: ['ū', 'uu'], val: '𑼹' },
          { keys: ['é', 'è'], val: '𑼾' },
          { keys: ['e'], val: optPepet === 'classic' ? '𑽀' : '𑼾' },
          { keys: ['ai', 'ay'], val: '𑼿' },
          { keys: ['o', 'ó', 'ò', 'ô'], val: '𑼾𑼴' },
          { keys: ['au'], val: '𑼿𑼴' },
          { keys: ['ě', 'ĕ', 'ë', 'ë́', 'ë̀', 'ë̂', 'ê', 'ə', 'eu'], val: '𑽀'},
          { keys: ['ěě', 'ĕĕ', 'ö', 'êê', 'əə'], val: '𑽀𑼴' }
        ];

        for (const group of vowelGroups) {
          for (const k of group.keys) {
            vowelMappings.set(k, group.val);
          }
        }
      }

      function cycleOption(key) {
        const opt = CONFIGOPTIONS[key];
        opt.index = (opt.index + 1) % opt.states.length;
        opt.element.value = opt.labels[opt.index];
        updateMappings();
        transcribe();
      }

      updateMappings();

      const SAMPLES = [
        "Semua orang dilahirkan merdeka dan mempunyai martabat dan hak-hak yang sama. Mereka dikaruniai akal dan hati nurani dan hendaknya bergaul satu sama lain dalam semangat persaudaraan.",
        "Saben uwong kalairaké kanthi mardikå lan darbé martabat lan hak-hak kang pådhå. Kabèh pinaringan akal lan kalbu sartå kaajab pasrawungan anggoné mêmitran siji lan sijiné kanthi jiwå sumadulur.",
        "Sakumna jalma gubrag ka alam dunya téh sipatna merdika jeung boga martabat katut hak-hak anu sarua. Maranéhna dibéré akal jeung haté nurani, campur-gaul jeung sasamana aya dina sumanget duduluran.",
        "Bawat tao'y isinilang na may layà at magkakapantáy ang tagláy na dangál at karapatán. Silá'y pinagkalooban ng pangangatwiran at budhî, at dapat magpálagayan ang isá't-isá sa diwà ng pagkákapatiran.",
        "An gabos na tawo ipinangaking may katalinkasan asin parantay sa dignidad asin derechos. Sinda gabos tinawan nin pag-isip asin konsiensiya kaya dapat na makipag-iriba sa lambang saro bilang mga magturugang.",
        "Semua manusia dilahirkan bebas dan sama rata dari segi maruah dan hak-hak. Mereka mempunyai pemikiran dan perasaan hati dan hendaklah bertindak di antara satu sama lain dengan semangat persaudaraan.",
        "Ang tanang katawhan gipakatawo nga may kagawasan ug managsama sa kabililhon. Sila gigasahan sa salabutan ug tanlag og mag-ilhanay isip managsoon sa usa'g-usa diha sa diwa sa ospiritu.",
        "Sâdhâjâna orèng lahèr mardhika èsarengè dhrâjhât klabân ha'-ha' sè padâ. Sâdhâjâna èparèngè akal sareng nurani bân kodhu areng-sareng akanca kadhi tarètan.",
        "Amin nga tao nga sibibiag ket naiyanak a siwawayawaya ken addaan iti agpapada nga dayaw ken kalintegan. Naikkanda ti panagikalintegan ken konsensya a nasken ti panagtitinnulong iti meysa ken meysa iti espiritu nga nainkak-absatan.",
        "Ang tanán nga táwo ginbún-ag nga hílway kag may pag-alalangay sa dungóg kag kinamatárong. Silá ginhatágan sing pagpamat-ud kag balatyágon kag nagakadápat nga magbinuligáy sa kahulugan sang pag-inuturáy.",
        "Sadonyo urang lahia mardeka jo punyo martabaik jo hak-hak nan samo. Nyo diagiah aka jo hati nurani sarato handaknyo babaua samo nan lainnyo dalam samangaik badunsanak."
      ];

      let sampleIndex = 0;
      function loadSample() {
        inputArea.value = SAMPLES[sampleIndex];
        sampleIndex = (sampleIndex + 1) % SAMPLES.length;
        transcribe();
      }

      function transcribe() {
        outputArea.value = austroToKawi(inputArea.value);
      }

      function austroToKawi(inputText) {
        const textLower = inputText.toLowerCase();
        let result = '';
        let i = 0;

        while (i < textLower.length) {
          // --- CODA DIACRITIC EVALUATION ---
          let codaMatched = false;
          for (const cLen of [2, 1]) {
            if (i + cLen <= textLower.length) {
              let potentialCoda = textLower.slice(i, i + cLen);
              if (codas.has(potentialCoda)) {
                let nextIdx = i + cLen;
                
                // Skip over cluster-breakers to find the true next character
                while (nextIdx < textLower.length && ''.includes(textLower[nextIdx])) {
                  nextIdx++;
                }

                let nextChar = textLower[nextIdx];
                let isWordBoundary = !nextChar || ' \'-:;\n\r\t.,𑽉𑽅𑽄𑽊𑽃'.includes(nextChar);
                
                // Lookahead: check if the next string block forms a new consonant syllable
                let nextIsConsonant = false;
                if (!isWordBoundary) {
                  for (const testLen of [2, 1]) {
                    if (standardConsonants.has(textLower.slice(nextIdx, nextIdx + testLen))) {
                      nextIsConsonant = true;
                      break;
                    }
                  }
                }

                // JAVANESE LOGIC: "ng" or "h" is a coda if it hits a word boundary 
                // OR if it is immediately followed by another consonant (syllable-final)
                if (isWordBoundary || nextIsConsonant) {
                  let lastChar = result.slice(-1);
                  if (result.length > 0 && !'𑽉𑽅𑽄𑽊𑽃 '.includes(lastChar)) {
                    result += codas.get(potentialCoda);
                    i = nextIdx; // Advance past the coda and any bypassed cluster-breakers
                    codaMatched = true;
                    break;
                  }
                }
              }
            }
          }
          if (codaMatched) continue;

          let char = textLower[i];
          
          if (punctuationMap.has(char)) {
            result += punctuationMap.get(char);
            if (i + 1 < textLower.length && textLower[i + 1] === ' ') {
              result += ' ';
              i += 2;
            } else {
              i++;
            }
            continue;
          }

          let matched = false;
          let matchedLength = 1;

          for (const cLen of [2, 1]) {
            if (i + cLen > textLower.length) continue;
            let modernCons = textLower.slice(i, i + cLen);

            if (standardConsonants.has(modernCons)) {
              if (modernCons === 'r') {
                let nextIdx = i + cLen;
                let nextConsLen = 0;

                for (const testLen of [2, 1]) {
                  if (nextIdx + testLen <= textLower.length) {
                    let subsequentCons = textLower.slice(nextIdx, nextIdx + testLen);
                    if (standardConsonants.has(subsequentCons)) {
                      nextConsLen = testLen;
                      break;
                    }
                  }
                }

                if (nextConsLen > 0) {
                  result += '𑼂'; 
                  matchedLength = cLen; 
                  matched = true;
                  break;
                }
              }

              let kawiBase = standardConsonants.get(modernCons);
              let kawiGlyph = consonantMappings.get(kawiBase);

              for (const vLen of [2, 1]) {
                if (i + cLen + vLen > textLower.length) continue;
                let vowelSub = textLower.slice(i + cLen, i + cLen + vLen);

                if (vowelMappings.has(vowelSub)) {
                  result += kawiGlyph + vowelMappings.get(vowelSub);
                  matchedLength = cLen + vLen;
                  matched = true;
                  break;
                }
              }

              if (!matched) {
                let nextIdx = i + cLen;
                let nextConsLen = 0;

                // Skip over internal cluster-breakers for Lookahead 1
                while (nextIdx < textLower.length && ''.includes(textLower[nextIdx])) {
                  nextIdx++;
                }

                // Lookahead 1: Find the immediate next consonant
                if (nextIdx < textLower.length && !' \t\n\r.,𑽉𑽅𑽄𑽊𑽃'.includes(textLower[nextIdx])) {
                  for (const testLen of [2, 1]) {
                    if (standardConsonants.has(textLower.slice(nextIdx, nextIdx + testLen))) {
                      nextConsLen = testLen;
                      break;
                    }
                  }
                }

                let nextIsConsonant = (nextConsLen > 0);
                let thirdIsConsonant = false;
                let fourthIsConsonant = false;

                // Lookahead 2: Check for Consonant 3
                if (nextIsConsonant) {
                  let thirdIdx = nextIdx + nextConsLen;
                  while (thirdIdx < textLower.length && ''.includes(textLower[thirdIdx])) {
                    thirdIdx++;
                  }
                  if (thirdIdx < textLower.length && !' \t\n\r.,𑽉𑽅𑽄𑽊𑽃'.includes(textLower[thirdIdx])) {
                    let thirdConsLen = 0;
                    for (const testLen of [2, 1]) {
                      if (standardConsonants.has(textLower.slice(thirdIdx, thirdIdx + testLen))) {
                        thirdConsLen = testLen;
                        thirdIsConsonant = true;
                        break;
                      }
                    }

                    // Lookahead 3: Check for Consonant 4 (crucial for balancing pairs)
                    if (thirdIsConsonant) {
                      let fourthIdx = thirdIdx + thirdConsLen;
                      while (fourthIdx < textLower.length && ''.includes(textLower[fourthIdx])) {
                        fourthIdx++;
                      }
                      if (fourthIdx < textLower.length && !' \t\n\r.,𑽉𑽅𑽄𑽊𑽃'.includes(textLower[fourthIdx])) {
                        for (const testLen of [2, 1]) {
                          if (standardConsonants.has(textLower.slice(fourthIdx, fourthIdx + testLen))) {
                            fourthIsConsonant = true;
                            break;
                          }
                        }
                      }
                    }
                  }
                }

                // --- PERFECT RHYTHMIC CLUSTER RESOLUTION ---
                let insideOpenStack = result.endsWith('𑽂');

                if (nextIsConsonant) {
                  if (!insideOpenStack) {
                    // BASELINE RULE:
                    // If 3 consonants are in a row (e.g., k-s-t), break immediately with Pangkon -> (tek-sto).
                    // If 4 consonants are in a row (e.g., k-s-t-r), safe to stack into pairs -> (eks-tra).
                    if (thirdIsConsonant && !fourthIsConsonant) {
                      result += kawiGlyph + '𑽁';
                    } else {
                      result += kawiGlyph + '𑽂';
                    }
                  } else {
                    // SUBSCRIPT RULE:
                    // If we are already a subscript, we must break if *any* more consonants follow.
                    if (thirdIsConsonant) {
                      result += kawiGlyph + '𑽁';
                    } else {
                      result += kawiGlyph + '𑽂';
                    }
                  }
                } else {
                  // No consonants follow -> terminal word boundary
                  result += kawiGlyph + '𑽁';
                }

                matchedLength = cLen;
                matched = true;

              }
            }
            if (matched) break;
          }

          if (!matched) {
            for (const vLen of [3, 2, 1]) {
              if (i + vLen > textLower.length) continue;
              let vowelSub = textLower.slice(i, i + vLen);

              if (independentVowels.has(vowelSub)) {
                result += independentVowels.get(vowelSub);
                matchedLength = vLen;
                matched = true;
                break;
              }
            }
          }

          if (!matched) {
            result += inputText[i];
          }

          i += matchedLength;
        }

        return result;
      }