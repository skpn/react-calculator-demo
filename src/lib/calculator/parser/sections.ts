type Extractor = {
  sectionStartIndex: number;
  openingLevel: number;
  sections: string[];
};

export const extractInnerSections = (inputString: string): string[] => {
  let extractor: Extractor = {
    sectionStartIndex: 0,
    openingLevel: 0,
    sections: [],
  };
  for (let index = 0; index < inputString.length; index++) {
    if (inputString[index] === '(') {
      extractor = handleOpeningParenthesis(inputString, index, extractor);
    } else if (inputString[index] === ')') {
      extractor = handleClosingParenthesis(inputString, index, extractor);
    }
    if (index === inputString.length - 1) {
      extractor = handleStringEnd(inputString, index, extractor);
      return extractor.sections.filter(
        (section) => section.length > 0 && section !== '()'
      );
    }
  }
  return [];
};

const handleOpeningParenthesis = (
  inputString: string,
  index: number,
  extractor: Extractor
): Extractor => {
  extractor.openingLevel += 1;
  if (extractor.openingLevel === 1 && extractor.sectionStartIndex !== index) {
    let newSection = inputString.slice(extractor.sectionStartIndex, index);
    extractor.sections.push(newSection);
    extractor.sectionStartIndex = index;
  }
  return extractor;
};

const handleClosingParenthesis = (
  inputString: string,
  index: number,
  extractor: Extractor
): Extractor => {
  if (extractor.openingLevel > 0) {
    extractor.openingLevel -= 1;
    if (extractor.openingLevel === 0) {
      let newSection = inputString.slice(
        extractor.sectionStartIndex,
        index + 1
      );
      extractor.sections.push(newSection);
      extractor.sectionStartIndex = index + 1;
    }
    return extractor;
  } else {
    throw 'missing opening parenthesis';
  }
};

const handleStringEnd = (
  inputString: string,
  index: number,
  extractor: Extractor
): Extractor => {
  if (extractor.openingLevel !== 0) {
    throw 'missing closing parenthesis';
  }
  let newSection = inputString.slice(extractor.sectionStartIndex, index + 1);
  extractor.sections.push(newSection);
  return extractor;
};
