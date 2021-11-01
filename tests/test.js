const validateTag = require('../src/tagChecker')

test(`Paragraph should not be null`, ()=>{
    const paragraph = '<A>Row, row, row your boat, gently down the stream.</A>'
    expect(paragraph).not.toBeNull();
})

test(`Undefined paragraph will result in a message 'Please enter a sentence or paragraph'`, ()=>{
    let paragraph;
    const result = validateTag(paragraph);
    expect(paragraph).not.toBeDefined() && expect(result).toBe('Please enter a sentence or paragraph') ;
})

test(`Paragraph 'The followi\yng text<C><B>is cen<d>tred and in boldface</B></C>' should result in 'Corrrectly tagged paragraph'`, ()=>{
    const result = validateTag(`The following text<C><B>is centred and in boldface</B></C>`);
    expect(result).toBe('Correctly tagged paragraph');
})

test(`Paragraph '<A><B><C>The world is your oyster</C></B></A>' should result in 'Corrrectly tagged paragraph'`, ()=>{
    const result = validateTag(`<A><B><C>The world is your oyster</C></B></A>`);
    expect(result).toBe('Correctly tagged paragraph');
})

test(`Paragraph '<A>He plunged in among the big spruce trees</A><B>The trail was faint</B>' should result in 'Corrrectly tagged paragraph'`, ()=>{
    const result = validateTag(`<A>He plunged in among the big spruce trees</A><B>The trail was faint</B>`);
    expect(result).toBe('Correctly tagged paragraph');
})

test(`Paragraph '<B><C>In the course of the next two hours he came upon several similar traps.</B></C>' should result in 'Expected </C> found </B>'`, ()=>{
    const result = validateTag(`<B><C>In the course of the next two hours he came upon several similar traps.</B></C>`);
    expect(result).toBe('Expected </C> found </B>');
})

test(`Paragraph '<G></G>All this the man knew</H>' should result in 'Expected # found </H>'`, ()=>{
    const result = validateTag(`<G></G>All this the man knew</H>`);
    expect(result).toBe('Expected # found </H>');
})

test(`Paragraph 'And all the time the dog ran with him, <R><F>at his heels</F>' should result in 'Expected </R> found #'`, ()=>{
    const result = validateTag(`And all the time the dog ran with him, <R><F>at his heels</F>`);
    expect(result).toBe('Expected </R> found #');
})