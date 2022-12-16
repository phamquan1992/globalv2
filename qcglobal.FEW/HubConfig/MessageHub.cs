using Microsoft.AspNetCore.SignalR;
using qcglobal.Core.Domain2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qcglobal.FEW.HubConfig
{
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
        public static HashSet<UserClient> ListUser = new HashSet<UserClient>();
    }
    public class MessageHub : Hub
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            UserHandler.ListUser.Add(new UserClient { id = Context.ConnectionId, user = "" });
            Clients.All.SendAsync("ReceiveMessage", "");
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            UserHandler.ListUser.RemoveWhere(t => t.id == Context.ConnectionId);
            Clients.All.SendAsync("ReceiveMessage", "");
            return base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessageToAll(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task SendMessageToUser(string from, string to, string message)
        {
            var list = UserHandler.ListUser.ToList();
            if (from != "")
            {
                string userid = list.Find(t => t.user == to).id;
                await Clients.Client(userid).SendAsync("User_send", message);
            }
        }
        public async Task SendMessage(string from, string to, string message)
        {
            var list = UserHandler.ListUser.ToList();
            if (from != "" && to != "" && message != "")
            {
                string userid = list.Find(t => t.user == to).id;
                var message_obj = new ChatMessage { from_user = from, to_user = to, message = message };
                await Clients.Client(userid).SendAsync("SendMessage", message_obj);
            }
        }
        public void UpdateUser(string conectId, string name)
        {
            var list = UserHandler.ListUser.ToList();
            var item = list.Find(t => t.id == conectId);
            item.user = name;
        }
        public List<string> GetAllActiveConnections()
        {
            return UserHandler.ConnectedIds.ToList();
        }
    }
}
