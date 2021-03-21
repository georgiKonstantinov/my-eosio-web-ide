#include <eosio/eosio.hpp>

using namespace eosio;

 struct [[eosio::table("slmtracking"), eosio::contract("slm_usage_tracking")]]  slm_usage_tracking_record {
    uint64_t    id       = {}; // Non-0
    eosio::name customer  = {};
    eosio::name provider  = {};
    uint64_t component; 
    std::string version;
    std::string sysid;
    std::string sysinfo;
    std::vector<std::string> ipfs_hash;

    uint64_t primary_key() const { return id; }
};


typedef eosio::multi_index<name("slmtracking"), slm_usage_tracking_record> slm_usage_tracking_index; 


class slm_usage_tracking : eosio::contract {
  public:
    using contract::contract;


    [[eosio::action]] void post(uint64_t id, eosio::name customer, eosio::name provider, uint64_t component, std::string version, std::string sysid, std::string sysinfo, std::vector<std::string> ipfs_hash) {
        slm_usage_tracking_index table(get_self(), get_self().value);

        require_auth(customer);

        eosio::check(id < 1'000'000'000ull, "user-specified company id is too big");
        if (!id)
            id = std::max(table.available_primary_key(), 1'000'000'000ull);

        table.emplace(get_self(), [&](auto& slm_usage_tracking) {
            slm_usage_tracking.id    = id;
            slm_usage_tracking.customer = customer;
            slm_usage_tracking.provider = provider;
            slm_usage_tracking.component  = component;
            slm_usage_tracking.version = version;
            slm_usage_tracking.sysid = sysid;
            slm_usage_tracking.sysinfo = sysinfo;
            slm_usage_tracking.ipfs_hash= ipfs_hash;
        });

        print("Created tracking record for system: ", sysinfo);
    }
};


