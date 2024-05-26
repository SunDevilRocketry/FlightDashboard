async function createOptions($el) {
    let $al = $el.siblings('.autocomplete-list');
    await eel.folder_select($el.val())((res) => {
        let options = '';
        res.forEach(element => {
            options += '<div class="autocomplete-item">' + element + '</div>';
        });
        $al.html(options);
    });
}

function updateSelectedIndex(currentIndex, newIndex, autocompleteItems) {
    if (autocompleteItems) {
        currentIndex = Math.min(autocompleteItems.length - 1, Math.max(0, newIndex));
        autocompleteItems.removeClass('active').eq(currentIndex).addClass('active');
    }
    return currentIndex;
}

async function showDropdown() {
    await createOptions($(this));
    let $input = $(this);
    let currentIndex = $input.data('index');
    let $autocompleteList = $input.siblings('.autocomplete-list');
    $autocompleteList.removeClass('d-none');
    let newIndex = updateSelectedIndex(currentIndex, -1);
    $input.data('index', newIndex);
}

function selectOption() {
    let $selected = $(this);
    let selection = $selected.text();
    let $input = $selected.parent().siblings('.autocomplete');
    $input.val(selection);
    let $autocompleteList = $selected.parent();
    $autocompleteList.addClass('d-none');
}

function scrollDropdown(index, autocompleteItems) {
    let autocompleteList = autocompleteItems.parent()
    if (index >= 0 && index < autocompleteItems.length) {
        let itemHeight = autocompleteItems.eq(index).outerHeight();
        let scrollTop = autocompleteList.scrollTop();
        let containerHeight = autocompleteList.height();
        if (index*itemHeight < scrollTop) {
            autocompleteList.scrollTop(index*itemHeight);
        } else if ((index+1)*itemHeight > scrollTop + containerHeight) {
            autocompleteList.scrollTop((index+1)*itemHeight - containerHeight);
        }
    }
}

async function navigateDropdown(e) {
    let $input = $(this);
    let currentIndex = $input.data('index');
    let $autocompleteList = $input.siblings('.autocomplete-list');
    let $autocompleteItems = $autocompleteList.children('.autocomplete-item');
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = updateSelectedIndex(currentIndex, currentIndex + 1, $autocompleteItems);
        scrollDropdown(currentIndex, $autocompleteItems);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = updateSelectedIndex(currentIndex, currentIndex - 1, $autocompleteItems);
        scrollDropdown(currentIndex, $autocompleteItems);
    } else if (e.key === 'Enter' && currentIndex !== -1) {
        e.preventDefault();
        let $selected = $autocompleteItems.eq(currentIndex);
        let selection = $selected.text();
        $input.val(selection);
        $autocompleteItems.removeClass('active');
        await createOptions($input);
        currentIndex = -1;
        scrollDropdown(currentIndex, $autocompleteList.children('.autocomplete-item'));
    }
    $input.data('index', currentIndex);
}

function validateFolder() {
    let $folder = $('#folder-select');
    let folder = ($folder.val() + '/').replaceAll('//', '/');
    let $error = $('#folder-select-validation');
    $('#file-path').html(folder);
    eel.check_folder(folder)((res) => {
        if (res.valid) {
            $folder.attr('pattern', res.valid);
        } else if (res.invalid) {
            $folder.attr('pattern', 'invalid');
            $error.html(res.invalid);
        }
    });
}

function validateFile() {
    let $file = $('#file-name');
    let $folder = $('#folder-select');
    let folder = ($folder.val() + '/').replaceAll('//', '/');
    let $error = $('#file-name-validation');
    eel.check_file(folder, $file.val())((res) => {
        if (res.valid) {
            $file.attr('pattern', res.valid);
        } else if (res.invalid) {
            $file.attr('pattern', 'invalid');
            $error.html(res.invalid);
        }
    });
}

$(document).ready(() => {
    $('.autocomplete').on('input', showDropdown);
    $('.autocomplete-list').on('click', '.autocomplete-item', selectOption);
    $('.autocomplete').on('keydown', navigateDropdown);

    $('.autocomplete').on('focusout', (e) => {
        let $inp = $(e.currentTarget);
        let $autocompleteList = $inp.siblings('.autocomplete-list');
        if (!$autocompleteList.hasClass('d-none')) {
            $autocompleteList.addClass('d-none');
        }
    });

    $('#folder-select').on('change', (e) => {
        validateFolder();
    });

    $('#file-name').on('change', (e) => {
        validateFile();
    });

    $('form.needs-validation').on('submit', (e) => {
        let form = e.currentTarget;
        validateFolder();
        validateFile();
        // default validation
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            // submit form to python and prevent default method
            let data = $(form).serializeArray();
            eel.set_config(data);
            e.preventDefault();
            window.location.href = "dash.html";
        }
        form.classList.add('was-validated');
    });
});
