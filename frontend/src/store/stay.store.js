import { stayService } from '../services/stay.service'

export const stayStore = {
    state: {
        stays: [],
        currStay: null,
        filterBy:{
            label: '',
            country:'',
            guestsCount:0,
            page:1
        },
        searchCountryList: [],
        isLoadingStays:false
    },
    getters: {
        stays({ stays }) {
            return stays
        },
        getCurrStay({ currStay }) {
            return currStay
        },
        searchCountryList({ searchCountryList }){
            return searchCountryList
        },
        filterBy({ filterBy }){
            return filterBy
        },
        isLoadingStays({ isLoadingStays }){
            return isLoadingStays
        }
        
    },
    mutations: {
        resetSearchList(state){
            state.searchCountryList = []
        },
        setCurrStay(state, { stay }) {
            state.currStay = stay
        },
        setStays(state, { stays }) {
            state.stays = stays
        },
        addStay(state, { stay }) {
            state.stays.push(stay)
        },
        updateStay(state, { stay }) {
            const idx = state.stays.findIndex(c => c._id === stay._id)
            state.stays.splice(idx, 1, stay)
        },
        removeStay(state, { stayId }) {
            state.stays = state.stays.filter(stay => stay._id !== stayId)
        },
        setFilter(state, { filter }) {
            state.filterBy = filter
        },
        setCountryList(state , { searchList }){
            state.searchCountryList = searchList
        },
        setLoading(state ,{ value }){
            state.isLoadingStays = value
        }
    },
    actions: {
        async getCountryList({ commit }, { txt }){
            try{
                const searchList = await stayService.getSearchedStays(txt)
                commit({ type: 'setCountryList', searchList })
            }catch(err){
                console.log('failed to get list' , err)
            }
        },
        async setCurrStay(context, { stayId }) {
            try {
                const currStay = await stayService.getById(stayId)
                context.commit({ type: 'setCurrStay', stay: currStay })
                return currStay
            }
            catch(err) {
                console.log('Cannot remove stay', err)
                throw err
            }
        },
        async addStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionAddStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in addStay', err)
                throw err
            }
        },
        async updateStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionUpdateStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in updateStay', err)
                throw err
            }
        },
        async loadStays({ state, commit }) {
            try {
                commit({ type: 'setLoading', value:true })
                const stays = await stayService.query(state.filterBy)
                commit({ type: 'setStays', stays })
                commit({ type: 'setLoading', value:false })
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            }
        },
        setFilterBy({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filter: filterBy })
            dispatch({ type: 'loadStays' })
        },
        async removeStay(context, { stayId }) {
            try {
                await stayService.remove(stayId)
                context.commit(getActionRemoveStay(stayId))
            } catch (err) {
                console.log('stayStore: Error in removeStay', err)
                throw err
            }
        }
    }
}