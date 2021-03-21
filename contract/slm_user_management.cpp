#include <eosio/eosio.hpp>


using namespace eosio;

 struct [[eosio::table("slmusers"), eosio::contract("slm_user_management")]]  slm_users_record {
    uint64_t    id       = {}; // Non-0
    eosio::name company     = {};
    bool isprovider = false;
    bool iscustomer  = false;
    bool isconsult = false;
    bool isauditor = false;
    bool is3pvendor = false;

    uint64_t primary_key() const { return id; }
};


typedef eosio::multi_index<name("slmusers"), slm_users_record> slm_users_index; 


class slm_user_management : eosio::contract {
  public:
    using contract::contract;


    [[eosio::action]] void post(uint64_t id, eosio::name company, bool isprovider, bool iscustomer, bool isconsult, bool isauditor, bool is3pvendor) {
        slm_users_index table(get_self(), get_self().value);

        require_auth(company);

        eosio::check(id < 1'000'000'000ull, "user-specified company id is too big");
        if (!id)
            id = std::max(table.available_primary_key(), 1'000'000'000ull);

        table.emplace(get_self(), [&](auto& slm_users) {
            slm_users.id    = id;
            slm_users.company    = company;
            slm_users.isprovider = isprovider;
            slm_users.iscustomer  = iscustomer;
            slm_users.isconsult = isconsult;
            slm_users.isauditor = isauditor;
            slm_users.is3pvendor = is3pvendor;
        });

        print("Created company: ", company);
    }
};


