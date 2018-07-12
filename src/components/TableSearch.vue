<template>
<div>
    <v-btn :color="color.in" fab small @click="showSearch = !showSearch" class="search-btn">
        <svg-icon :icon-class="`search1`" :class-name="`search-icon small`"></svg-icon>
    </v-btn>
    <transition name="zoom">
        <div class="search-container" v-if="isShow">
        <div class="query-search">
            <AutoComplete
                class="query-string"
                v-model="queryString"
                placeholder="example: srcip=0.0.0.0 "
                style="width:200px"></AutoComplete>
            <Button type="ghost" class="submit-btn" @click="submit">Send</Button>
        </div>
        <div class="query-params-list">
            <div class="params-list" v-for="param in params" :key="param.key">
                <Checkbox v-model="param.isSelected" @on-change="getQueryString"></Checkbox>
                <div class="param-name">
                    <AutoComplete
                        class="param-name"
                        v-model="param.name"
                        @on-change="handleFilter(param.name, param.key)"
                        placeholder="filter name"
                    style="width:100%">
                        <div class="demo-auto-complete-item" v-for="item in param.filterOptions" :key="item.filed">
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
            showSearch: false,
            queryString: '',
            params:[],
            filedObj : {
                'threat': 'Threat',
                'threat_level': 'Threat Level',
                'threat_type': 'Threat Type',
                'src_interface': 'Source Interface',
                'desc_interface': 'Destination Interface',
            },
            valueObj:{
                'threat_level':{
                    'High':'4'
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
                            title: 'Source Interface',
                        },
                        {
                            title: 'Destination Interface',
                        }
                    ]
                },
            ],
        }
    },
    created(){

    },
    methods: {
        getFiledByText(value) {
            return Object.keys(this.filedObj).find(key => this.filedObj[key] === value);
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
            var filed = this.getFiledByText(name) ? this.getFiledByText(name) : name
            this.params[key].filed = filed
            this.params[key].valueOptions = this.getValueOption(filed)
            this.getQueryString()
        },
        handleValue(value, key){
            var field = this.params[key].filed
            var rValue = ''
            if(field && this.valueObj[field]){
                rValue = this.valueObj[field][value]
            } else{
                rValue = value
            }
            this.params[key].rValue = rValue
            this.getQueryString()
        },
        getValueOption(filed){
            var opts = []
            if(this.valueObj[filed]){
                opts = Object.keys(this.valueObj[filed])
            }
            return opts
        },
        getQueryString(){
            this.queryString = this.params.reduce((res,param)=>{
                if(param.isSelected){
                    if(param.filed){
                        res = res + param.filed + '='
                    }
                    if(param.rValue){
                        res = res + param.rValue + ' '
                    }
                }
                return res
            }, '')
        },
        addParam(){
            var param = {
                name: '',
                value:'',
                filed:'',
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
        submit(){
            this.$emit('searchsubmit', this.queryString)
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
@input-ph-color:#596273;
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
    height: 400px;
    //background-color: rgba(150, 150, 150, 0.3);
    background-color: @bg-color;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    z-index: 10;
    overflow-y: auto;
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
    .minus-btn{
        color: red;
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


