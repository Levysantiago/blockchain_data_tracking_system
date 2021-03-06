pragma solidity ^0.4.23;

    /**
     * Contrato que representa um sensor DHT11. Este contrato é responsável por receber, armazenar e monitorar todas as leituras 
     * do sensor DHT11, de tal forma que, se um valor exceder o máximo predefinido, este gera um evento que pode ser recuperado
     * por uma aplicação exterior para tomar uma decisão.
     *
     * VARIÁVEIS DO CONTRATO
     * owner: Dono do contrato, que será o produtor
     * manager: Gerenciador do contrato, que será o Middleware
     * name: Nome do sensor
     * ids: Id do sensor (relacionado com o Banco de Dados)
     * max_temperature: A temperatura máxima. Caso a captura ultrapasse superiormente esse valor, o código gera um evento (temperatureOverflow);
     * min_temperature: A temperatura mínima. Caso a captura ultrapasse inferiormente esse valor, o código gera um evento (temperatureUnderflow);
     * max_humidity: A umidade máxima. Caso a captura ultrapasse superiormente esse valor, o código gera um evento (humidityOverflow);
     * min_humidity: A umidade mínima. Caso a captura ultrapasse inferiormente esse valor, o código gera um evento (humidityUnderflow);
     * temperatures: Um array para armazenar todas as capturas de temperatura ambiente;
     * temperatures_count: Conta a quantidade de capturas de temperatura salvas na lista "tempereatures"
     * humidities: Um array para armazenar todas as capturas de umidade ambiente;
     * humidities_count: Conta a quantidade de capturas de umidade salvas na lista "humidities"
     * 
     * EVENTOS
     * temperatureOverflow: É gerado quando uma captura de temperatura ultrapassa superiormente seu valor máximo (max_temperature);
     * temperatureUnderflow: É gerado quando uma captura de temperatura ultrapassa inferiormente seu valor mínimo (min_temperature);
     * humidityOverflow: É gerado quando uma captura de umidade ultrapassa superiormente seu valor máximo (max_humidity)
     * humidityUnderflow: É gerado quando uma captura de umidade ultrapassa inferiormente seu valor mínimo (min_humidity)
     **/
contract DHT11{
     //DADOS DE IDENTIFICAÇÃO
    address public owner;
    address public manager;
    string public name;
    uint public ids;
    
    //ESTRUTURA PARA ARMAZENAR MEDIDAS
    struct T_Measures {
        uint[] temperatures;
        uint[] humidities;
    }
    
    mapping(uint => T_Measures) private fermentations;
    
    
    // VALORES PARA CONTROLE
    uint public max_temperature;
    uint public min_temperature;
    uint public max_humidity;
    uint public min_humidity;
    
    //LISTAS PARA ARMAZENAR LEITURAS
    // uint[] public temperature;
    // uint temperatures_count;
    // uint[] public humiditie;
    // uint humidities_count;
    
    //EVENTOS
    event temperatureOverflow(uint temperature, uint max_temperature);
    event temperatureUnderflow(uint temperature, uint min_temperature);
    event humidityOverflow(uint humidity, uint max_humidity);
    event humidityUnderflow(uint humidity, uint min_humidity);
    
    /*MODIFICADORES*/
    
    /**
     * Nome do Modificador: onlyOwnerOrManager
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Utilizado para restringir acesso somente ao dono e gerenciador do contrato em determinadas funções
     * 
     * Parâmetros:
     * - address _owner: Um endereço. Este será válido somente se for o endereço do dono ou do gerenciador de contrato.
     * 
     * Retorno:
     * - null
     **/
    modifier onlyOwnerOrManager(address _address){
        require(_address == manager || _address == owner);
        _;
    }
    
    
    /**
     * Nome da Função: constructor
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Primeira função a ser chamada ao implementar o contrato na rede Ethereum. Esta inicializa o gerenciador (dono) do contrato,
     * o nome e valores iniciais para valores máximos e mínimos, os quais podem ser alterados pelo dono do contrato.
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - address _owner: O endereço do dono do contrato.
     * 
     * Retorno:
     * - null
     **/
    constructor(address _owner) public {
        owner = _owner;
        manager = msg.sender;
        name = 'DHT11';
        max_temperature = 10;
        min_temperature = 0;
        max_humidity = 10;
        min_humidity = 0;
    }
    
    /*FUNÇÕES SET CONDICIONAIS*/
    
    /**
     * Nome da Função: setTemperature
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Recebe um novo valor de temperatura, adiciona na lista de temperaturas capturadas e verifica se o valor recebido
     * ultrapassa superiormente ou inferiormente o mínimo e máximo.
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _temperature: A nova leitura de temperatura obtida.
     * 
     * Retorno:
     * null
     * 
     * Eventos:
     * Pode gerar os eventos "temperatureOverflow" ou "temperatureUnderflow"
     * - temperatureOverflow: É gerado quando "_temperature" ultrapassa superiormente "max_temperature";
     * - temperatureUnderflow: É gerado quando "_temperature" ultrapassa inferiormente "min_temperature".
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setTemperature(uint _temperature, uint _fermentation_id) public onlyOwnerOrManager(msg.sender) {
        uint[] storage temperatures = fermentations[_fermentation_id].temperatures;
        temperatures.push(_temperature);
        if(_temperature >= max_temperature){
            emit temperatureOverflow(_temperature, max_temperature);
        }
        else if(_temperature <= min_temperature){
            emit temperatureUnderflow(_temperature, min_temperature);
        }
    }
    
    /**
     * Nome da Função: setHumidity
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Recebe um novo valor de umidade, adiciona na lista de umidades capturadas e verifica se o valor recebido
     * ultrapassa superiormente ou inferiormente o mínimo e máximo.
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _humidity: A nova leitura de umidade obtida.
     * 
     * Retorno:
     * null
     * 
     * Eventos:
     * Pode gerar os eventos "humidityOverflow" ou "humidityUnderflow"
     * - humidityOverflow: É gerado quando "_humidity" ultrapassa superiormente "max_humidity";
     * - humidityUnderflow: É gerado quando "_humidity" ultrapassa inferiormente "min_humidity".
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setHumidity(uint _humidity, uint _fermentation_id) public onlyOwnerOrManager(msg.sender) {
        uint[] storage humidities = fermentations[_fermentation_id].humidities;
        humidities.push(_humidity);
        if(_humidity >= max_humidity){
            emit humidityOverflow(_humidity, max_humidity);
        }
        else if(_humidity <= min_humidity){
            emit humidityUnderflow(_humidity, min_humidity);
        }
    }
    
    /** FUNÇÕES SET **/
    
    /**
     * Nome da Função: setName
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Atualiza o nome do contrato
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _name: O novo nome do contrato.
     * - msg.sender: O endereço de quem está invocando a função
     * 
     * Retorno:
     * null
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setName(string _name) public onlyOwnerOrManager(msg.sender){
        name = _name;
    }
    
    /**
     * Nome da Função: setIds
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Atualiza o Id do sensor que o contrato representa
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _ids: O novo ID do sensor;
     * - msg.sender: O endereço de quem está invocando a função
     * 
     * Retorno:
     * null
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setIds(uint _ids) public onlyOwnerOrManager(msg.sender){
        ids = _ids;
    }
    
    /**
     * Nome da Função: setMaxHumidity
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Atualiza o valor máximo da umidade para invocar futuramente um evento
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _max_humidity: O novo valor máximo de umidade.
     * 
     * Retorno:
     * null
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setMaxHumidity(uint _max_humidity) public onlyOwnerOrManager(msg.sender){
        assert(_max_humidity > 0 && _max_humidity > min_humidity);
        max_humidity = _max_humidity;
    }
    
    /**
     * Nome da Função: setMaxTemperature
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Atualiza o valor máximo da temperatura para invocar futuramente um evento
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _max_temperature: O novo valor máximo de temperatura.
     * 
     * Retorno:
     * null
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setMaxTemperature(uint _max_temperature) public onlyOwnerOrManager(msg.sender){
        assert(_max_temperature > 0 && _max_temperature > min_temperature);
        max_temperature = _max_temperature;
    }
    
    /**
     * Nome da Função: setMinHumidity
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Atualiza o valor mínimo da umidade para invocar futuramente um evento
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _min_humidity: O novo valor mínimo de umidade.
     * 
     * Retorno:
     * null
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setMinHumidity(uint _min_humidity) public onlyOwnerOrManager(msg.sender){
        assert(_min_humidity >= 0 && _min_humidity < max_temperature);
        min_humidity = _min_humidity;
    }
    
    /**
     * Nome da Função: setMinTemperature
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Atualiza o valor mínimo da temperatura para invocar futuramente um evento
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * - _min_humidity: O novo valor mínimo de temperatura.
     * 
     * Retorno:
     * null
     * 
     * Restrição:
     * - onlyOwnerOrManager: Somente o dono ou gerenciador do contrato pode realizar esta operação
     **/
    function setMinTemperature(uint _min_temperature) public onlyOwnerOrManager(msg.sender){
        assert(_min_temperature >= 0 && _min_temperature < max_temperature);
        min_temperature = _min_temperature;
    }
    
    /** FUNÇÕES GET **/
    
    /**
     * Nome da Função: getLastValues
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Retorna os últimos valores lidos de temperatura e umidade (temperature e humidity)
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * null
     * 
     * Retorno:
     * - uint temperature: A última temperatura recebida pelo contrato;
     * - uint humidity: A última umidade recebida pelo contrato;
     **/
    function getLastValues(uint _fermentation_id) public view returns(uint, uint){
        uint[] memory temperatures = fermentations[_fermentation_id].temperatures;
        uint[] memory humidities = fermentations[_fermentation_id].humidities;
        uint temperatures_count = temperatures.length;
        uint humidities_count = humidities.length;
        assert(temperatures_count > 0 && humidities_count > 0);
        return (temperatures[temperatures_count-1], humidities[humidities_count-1]);
    }
    
    /**
     * Nome da Função: getTemperatures
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Retorna a lista de temperaturas capturadas (temperatures)
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * null
     * 
     * Retorno:
     * - uint[] temperatures: A lista de temperaturas capturadas
     **/
    function getTemperatures(uint _fermentation_id) public view returns(uint []){
        return fermentations[_fermentation_id].temperatures;
    }
    
    /**
     * Nome da Função: getHumidities
     * 
     * Autor: Levy Santiago
     * 
     * Descrição: Retorna a lista de umidades capturadas (humidities)
     * 
     * Escopo: public
     * 
     * Parâmetros:
     * null
     * 
     * Retorno:
     * - uint[] humidities: A lista de umidades capturadas
     **/
    function getHumidities(uint _fermentation_id) public view returns(uint []){
        return fermentations[_fermentation_id].humidities;
    }

}