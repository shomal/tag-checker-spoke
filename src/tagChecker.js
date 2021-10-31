/*****************************************************************************************************************/ 
/** Tag Checker Program
 *  Validates opening and closing tags in a given paragraph.
 *  The tags are defined as <X> or </x> where X is a single uppercase alphabet.
 *  Provides a result on whether tags are correct, mis-aligned or missing.
 */
/*****************************************************************************************************************/ 


/** Function getMatchingTag
 * @param {tag} tag - tag to provide a matching pair for. 
 * @returns matching tag (i.e. if an opening tag was provided, returns closing tag)
 */
function getMatchingTag(tag) {
    let tagPair;
    (/\//).test(tag) ? tagPair = tag.replace('</', '<') : tagPair = tag.replace('<', '</');
    return tagPair;
}

/**
 * @function validateTag
 * @param {paragraph} paragraph - paragraph to check for validity of tags
 * @returns result whether tags are correct or not.
 */
function validateTag(paragraph) {
    if (paragraph.length == 0 || paragraph === undefined) {
        return 'Please enter a sentence or paragraph';
    }

    //Find all tags
    let actualStringTags = paragraph.match(/<\/?[A-Z]>/g);
    let len = actualStringTags.length;
    if (len == 0 || actualStringTags === undefined) {
        return 'No tags found to validate in this paragraph';
    }

    //Iterate through each tags to find matching pair of tags
    let validationArray = [];
    for (let i = 0; i < len; i++) {
        let currentTag = actualStringTags[i];
        let tagProperty = currentTag.match(/[A-Z]/)[0];
        let lastItem = validationArray.slice(-1).toString();
        let lastItemProperty;
        lastItem ? lastItemProperty = lastItem.match(/[A-Z]/)[0] : lastItemProperty = null;
        if ((/<[A-Z]>/).test(currentTag)) {
            validationArray.push(currentTag);
        } else if (tagProperty === lastItemProperty) {
            validationArray.pop();
        } else {
            validationArray.push(currentTag);
            break;
        }
    }

    //Output result to show expected and actual tags.
    if (validationArray.length == 0) {
        return 'Correctly tagged paragraph';
    } else if (validationArray.length > 1) {
        let foundStr = validationArray.pop();
        let expectedStr = getMatchingTag(validationArray.pop());
        return (`Expected ${expectedStr} found ${foundStr}`);
    } else {
        let expectedStr;
        let foundStr = validationArray.pop();
        (/\//).test(foundStr) ? (expectedStr = '#') : (expectedStr = getMatchingTag(foundStr), foundStr = '#');
        return (`Expected ${expectedStr} found ${foundStr}`);
    }
}

/*****************************************************************************************************************/ 
/**
 *  Main
 *  Replace the empty string below with a paragraph or sentence to run this program.
 *  An example test case provided below.
 */
/*****************************************************************************************************************/ 

let inputParagraph = '';                                                //Replace '' with a paragraph

//inputParagraph = '<A><B><C>This is a test paragraph.</C></B></A>'; 

console.log(validateTag(inputParagraph));

