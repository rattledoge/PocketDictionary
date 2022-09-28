document.addEventListener('mouseup', (e) => {
    if (e.button !== 2) {
        return
    }

    const selection = window.getSelection()
    selection.removeAllRanges()

    const range = document.caretRangeFromPoint(e.clientX, e.clientY)
    range.expand('word')

    selection.addRange(range)
});