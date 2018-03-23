import { updateField, addErrors } from "./forms.js"


module.exports = {
    load: url => (state, actions) => {
        actions.updateLoading(true)
        setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
          let match = url.match(/\?page=(\d+)/)
          let page = 1;
          if (match) page = 1*match[1]
          
          actions.update({response: j, current: url, page});
          actions.updateLoading(false)
        }), 100);
    },

    updateLoading: loading => state => ({
        loading
    }),
    
    updateShowPlot: showPlot => state => ({
        showPlot
    }),

    update: ({response, current, page}) => state => ({
        page,
        current,
        count: response.count,
        next: response.next,
        previous: response.previous,
        items: response.results

    }),

    updateEdit: item => state => ({
        forms: Object.assign({}, state['forms'], {
            edit: item
        })
    }),
    

    saveEdit: ({key, g_actions}) => (state, actions) => {
        console.log("Saving ...", state)
        actions.updateLoading(true)
        let item = state.forms.edit
        let saveUrl = ''
        let method = ''
        if(item.id) { // UPDATE
            console.log("Update item")
            saveUrl = item.url
            method = 'PATCH'
        } else { // CREATE
            console.log("Create new item")
            saveUrl = window.g_urls.movies
            method = 'POST'
        }
        
        window.setTimeout( () => { 
            fetch(saveUrl, {
                body: JSON.stringify(item), 
                headers: {
                    'content-type': 'application/json',
                    'Authorization': "Token " + key
                },
                method,
            }).then(response => {
                actions.updateLoading(false)

                if(response.status == 400) {
                    response.json().then(errors => {
                        console.log(errors)
                        actions.addErrors({formname: 'edit', errors})
                    })
                } else if(response.status == 200 || response.status == 201) {
                    response.json().then(data => {
                        // Data is the object that was saved
                        console.log(data)
                        g_actions.toasts.add({text: "Successfully saved object!", style: "success"} ) 
                        actions.updateEdit(null)
                        actions.load(state.current)
                    })
                }
            }).catch(error => {
                console.log("ERR", error.status);
            })
        }, 500)
        
    },
    searchAction: (reset) => (state, actions) => {
        console.log("SEARCH", reset, state)
        if(reset) {

        }
    },
    updateField,
    addErrors
}