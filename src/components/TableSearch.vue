<template>
<div>
    <v-btn :color="color.level2.name" fab small @click="showSearch = !showSearch" class="search-btn">
        <svg-icon :icon-class="`search1`" :class-name="`search-icon small`"></svg-icon>
    </v-btn>
    <transition name="zoom">
      <div class="search-container" v-if="isShow">
        <div class="query-search">
            <span class="history" @click="toggleHistory" title="history search">
                <svg-icon :icon-class="'history'"
                    :class-name="'icon-shadow small'">
                </svg-icon>
            </span>
            <AutoComplete
                class="query-string"
                v-model="queryString"
                placeholder="example: srcip=0.0.0.0 "
                @on-change="queryStringChanged"
                style="width:200px"></AutoComplete>
            <Button type="ghost" class="submit-btn" @click="submit">Send</Button>
        </div>
        <div class="query-params-list" v-if="!isHistory">
            <div class="params-list" v-for="param in params" :key="param.key">
                <Checkbox v-model="param.isSelected" @on-change="getQueryString"></Checkbox>
                <div class="param-name">
                    <AutoComplete
                        class="param-name"
                        v-model="param.name"
                        @on-change="handleFilter(param.name, param.key)"
                        placeholder="filter name"
                    style="width:100%">
                        <div class="demo-auto-complete-item" v-for="item in param.filterOptions" :key="item.field">
                            <div class="demo-auto-complete-group">
                                <span>{{ item.title }}</span>
                            </div>
                            <Option v-for="option in item.children" :value="option.title" :key="option.title">
                                <span class="demo-auto-complete-title">{{ option.title }}</span>
                            </Option>
                        </div>
                    </AutoComplete>
                </div>
                <div class="param-value">
                    <AutoComplete
                        v-model="param.value"
                        @on-change="handleValue(param.value, param.key)"
                        :data="param.valueOptions"
                        placeholder="filter value"
                    style="width:100%"></AutoComplete>
                </div>
                <Button type="text" icon="minus" class="minus-btn" @click="deleteParam(param.key)"></Button>
            </div>
            <Button type="ghost" class="add-btn" @click="addParam"> + add filter</Button>
        </div> 
        <div class="query-history" v-if="isHistory">
            <div class="history-list" v-for="item in historys" 
                :key="item.key" >
                <div v-html="item.context" class="history-item" @click.prevent="selectHistory(item.key)"></div>
                <Button type="text" icon="minus" class="minus-btn" @click="deleteHistory(item.key)"></Button>
            </div>
            <div class="history-item" v-if="historys.length === 0"> no history search</div>

        </div>
      </div>
    </transition>
</div>
</template>
<script>
export default {
    name:'TableSearch',
    props:['color'],
    data () {
        return {
            isHistory: false,
            showSearch: false,
            queryString: '',
            params:[],
            historys:[],
            fieldObj : {
                'threat': 'Threat',
                'threatlevel': 'Threat Level',
                'threattype': 'Threat Type',
                'srcintf': 'Source Interface',
                'dscintf': 'Destination Interface',
                'policytype': 'Policy Type',
                'policyid': 'Policy ID',
                'dstcountry': 'Country',
                'utmaction': 'Security Action'
            },
            valueObj:{
                'threatlevel':{
                    'Critical':'5',
                    'High':'4',
                    'Medium':'3',
                    'Low':'2',
                    'Info':'1',
                }
            },
            filterNames: [
                {
                    title: 'Filters in table',
                    children: [
                        {
                            title: 'Threat',
                        },
                        {
                            title: 'Threat Level',
                        },
                        {
                            title: 'Threat Type',
                        },
                    ]
                },
                {
                    title: 'Others',
                    children: [
                        {
                            title: 'Country',
                        },
                        {
                            title: 'Destination Interface',
                        },
                        {
                            title: 'Source Interface',
                        },
                        {
                            title: 'Policy ID',
                        },
                        {
                            title: 'Policy Type',
                        },
                        {
                            title: 'Security Action',
                        },
                    ]
                },
            ],
        }
    },
    created(){

    },
    methods: {
        getfieldByText(value) {
            return Object.keys(this.fieldObj).find(key => this.fieldObj[key] === value);
        },
        handleFilter(name, key) {
            this.params[key].filterOptions = JSON.parse(JSON.stringify(this.filterNames)).filter(filterGroup=>{
                if(name){
                    var children = filterGroup.children
                    filterGroup.children = children.filter(child =>{
                        return child.title.toLowerCase().includes(name)
                    })
                    return filterGroup.children.length > 0
                } else{
                    return true
                }
            })
            var field = this.getfieldByText(name) ? this.getfieldByText(name) : name
            this.params[key].field = field
            this.params[key].valueOptions = this.getValueOption(field)
            this.getQueryString()
        },
        handleValue(value, key){
            var field = this.params[key].field
            var rValue = ''
            if(field && this.valueObj[field]){
                rValue = this.valueObj[field][value]
            } else{
                rValue = value
            }
            this.params[key].rValue = rValue
            this.getQueryString()
        },
        getValueOption(field){
            var opts = []
            if(this.valueObj[field]){
                opts = Object.keys(this.valueObj[field])
            }
            return opts
        },
        getQueryString(){
            this.queryString = this.params.filter(param=>{return param.isSelected})
            .reduce((res,param, idx)=>{
                if(idx !== 0  ){
                    res = res + ' | '
                }
                if(param.field){
                    res = res + param.field + '='
                }
                if(param.rValue){
                    res = res + param.rValue
                }
                return res
            }, '')
        },
        addParam(){
            var param = {
                name: '',
                value:'',
                field:'',
                isSelected: true,
                filterOptions: JSON.parse(JSON.stringify(this.filterNames)),
                key: this.params.length,
            }
            this.params.push(param)
        },
        deleteParam(key){
            this.params = this.params.filter(param=>{
                return param.key !== key;
            })
            this.getQueryString()
        },
        deleteHistory(key){
            this.historys = this.historys.filter(history=>{
                return history.key !== key;
            })
        },
        selectHistory(key){
            this.queryString = this.historys[key].context
            this.queryStringChanged()
        },
        // from change the query string directly from input or select from history record
        queryStringChanged(){
            this.params = []
            var params = this.queryString.split(' | ')
            params.map(param=>{
                var field = param.split('=')[0]
                var rValue = param.split('=')[1]
                var name = this.fieldObj[field] ? this.fieldObj[field] : field
                var value = this.valueObj[field] && this.valueObj[field][rValue] ?
                     this.getValueOption(this.valueObj[field][rValue]) : rValue
                var param = {
                    key: this.params.length,
                    name: name,
                    value: value,
                    field: field,
                    isSelected: true,
                    filterOptions: JSON.parse(JSON.stringify(this.filterNames)),
                }
                this.params.push(param)
                console.log('query change', field, rValue, param)
            })
        },
        submit(){
            var history = {
                key: this.historys.length,
                time: new Date(),
                context: this.queryString,
            }
            this.historys.push(history)
            this.$emit('searchsubmit', this.queryString)
        },
        toggleHistory(){
            this.isHistory = !this.isHistory
        }
    },
    computed:{
        isShow(){
            return this.showSearch
        }
    }
    
}
</script>
<style lang="less" scoped>
@bg-color: #2d2f3b;
@input-bg-color:#3e4555;
//@input-ph-color:#596273;
@input-ph-color:#aaa;
@btn-border-color:#949cae;
.search-btn{
    width: 35px;
    height: 35px;
    position: absolute;
    right: 5px;
    top: 0px;
    z-index: 11;
    .search-icon{
        color: white;
    }
}
.search-container{
    position: absolute;
    top: 30px;
    right: 35px;
    width: 500px;
    height: 450px;
    //background-color: rgba(150, 150, 150, 0.3);
    background-color: @bg-color;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    z-index: 10;
    //overflow-y: auto;
    .query-search, .params-list{
        display: flex;
        align-items: center;
    }
    .query-search{
        margin-bottom: 20px;
    }
    .query-string{
        flex-grow: 1;
    }
    .param-name, .param-value{
        flex-grow: 1;
        margin-right: 5px;
    }
    .params-list{
        margin-bottom: 5px;
    }
    .submit-btn{
        border-width: 2px;
        border-color:@btn-border-color;
        color:@btn-border-color;
        margin-left: 10px;
    }
    .add-btn{
        background-color: @input-bg-color;
        color:@input-ph-color;
        width: 100%;
        border:none;
        &:hover{
            color:white;
        }
        &:active, &:focus{
            border:none;
        }
    }
    .history-item{
        height: 30px;
        border-radius: 5px;
        flex-grow: 1;
        background-color: @input-bg-color;
        color: @input-ph-color;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .history-list{
        display: flex;
        align-items: center;
        .history-item{
            cursor: pointer;
            &:hover{
                color: white;
            }
        }
    }
    .minus-btn{
        color: red;
    }
    .history{
        cursor: pointer;
        margin-right: 10px;
    }
    .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
}

</style>


