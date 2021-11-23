import Select from './Select' 
import Button from './Button'

const CurrencyExchange = () => {
    return (
        <div>
            <Select text='From'/>
            <Select text='To'/>
            <Button text='Convert'/>
        </div>
    )
}

export default CurrencyExchange
