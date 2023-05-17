<!-- 
Responsabilidade de criar conexão com banco, 
responsabilidade de persisitir dados, 
responsabilidade de mudar o valor das propriedades da clase.

Muitas responsabilidades para uma classe
-->

<?php

class Course
{
    private $name;
    private $categoria;
    private $descricao;

    public function connection()
    {
        $pdo = new PDO();
        return $pdo;
    }

    public function createCategoria()
    {
        $this->connection()->insert($this->categoria);
    }

    public function createCrouse()
    {
        $this->connection()->insert($this->name);
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name= $name;
        return $this;
    }

    public function getCategoria()
    {
        return $this->categoria;
    }

    public function setCategoria($categoria)
    {
        $this->categoria= $categoria;
        return $this;
    }

    public function getDescricao()
    {
        return $this->descricao;
    }

    public function setDescricao($descricao)
    {
        $this->descricao= $descricao;
        return $this;
    }
    
}