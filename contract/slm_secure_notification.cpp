#include <eosio/eosio.hpp>

using namespace eosio;

 struct [[eosio::table("slmsecnotify"), eosio::contract("slm_secure_notification")]]  slm_secure_notifications_record {
    uint64_t id = {}; 
    eosio::name sender = {};
    std::string message = {};
    uint64_t component = 0;  

    uint64_t primary_key() const { return id; }
};


typedef eosio::multi_index<name("slmsecnotify"), slm_secure_notifications_record> slm_sec_notify_index; 


class slm_secure_notification : eosio::contract {
  public:
    using contract::contract;

    [[eosio::action]] void post(uint64_t id, eosio::name sender, eosio::name receiver, const std::string& message, uint64_t comopnent) {
        eosio::name scope = get_self(); 
        if(receiver.value != 0) {
            scope = receiver;
        } 

        slm_sec_notify_index table(get_self(), scope.value);

        require_auth(sender);

        eosio::check(id < 1'000'000'000ull, "user-specified notification id is too big");
        if (!id)
            id = std::max(table.available_primary_key(), 1'000'000'000ull);

        table.emplace(get_self(), [&](auto& slm_secure_notifications) {
            slm_secure_notifications.id    = id;
            slm_secure_notifications.sender = sender;
            slm_secure_notifications.message  = message;
            slm_secure_notifications.component = comopnent;
        });

        print("Created nofication: ", message);
    }
};


