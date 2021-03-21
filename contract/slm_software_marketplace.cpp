#include <eosio/eosio.hpp>


using namespace eosio;

 struct [[eosio::table("slmswmarket"), eosio::contract("slm_software_marketplace")]]  slm_software_marketplace_record {
    uint64_t id = {}; // Non-0
    eosio::name provider = {};
    std::string name;
    std::string version ;
    std::string status = "released";
    std::string info;
    std::vector<uint64_t> partof;
    std::vector<uint64_t> dependencies;
    std::string ipfs_hash;

    uint64_t primary_key() const { return id; }
};


typedef eosio::multi_index<name("slmswmarket"), slm_software_marketplace_record> slm_software_marketplace_index; 


class slm_software_marketplace : eosio::contract {
  public:
    using contract::contract;


    [[eosio::action]] void post(uint64_t id, eosio::name provider,  std::string name, std::string version, std::string status, std::string info, std::vector<uint64_t> partof, std::vector<uint64_t> dependencies, std::string ipfs_hash) {
        slm_software_marketplace_index table(get_self(), get_self().value);

        require_auth(provider);

        eosio::check(id < 1'000'000'000ull, "user-specified marketplace id is too big");
        if (!id)
            id = std::max(table.available_primary_key(), 1'000'000'000ull);

        table.emplace(get_self(), [&](auto& slm_software_marketplace) {
            slm_software_marketplace.id = id;
            slm_software_marketplace.provider = provider;
            slm_software_marketplace.name = name;
            slm_software_marketplace.version = version;
            slm_software_marketplace.status = status;
            slm_software_marketplace.info = info;
            slm_software_marketplace.partof = partof;
            slm_software_marketplace.dependencies = dependencies;
            slm_software_marketplace.ipfs_hash = ipfs_hash;
        });

        print("Created record in marketplace: ", name);
    }
};